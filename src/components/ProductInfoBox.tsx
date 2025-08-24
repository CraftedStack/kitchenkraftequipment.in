"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./ProductInfoBox.module.css";
import { FaProjectDiagram, FaSmile, FaAward } from "react-icons/fa";

const ProductInfoBox = () => {
  const [counts, setCounts] = useState([0, 0, 0]);
  const [hasCounted, setHasCounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targets = [1000, 1000, 100]; // Completed Projects, Satisfied Clients, Awards
    const duration = 2000;

    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const isVisible = top >= 0 && top <= window.innerHeight;

        if (isVisible && !hasCounted) {
          setHasCounted(true);

          targets.forEach((target, index) => {
            let start = 0;
            const increment = duration / target;

            const counter = setInterval(() => {
              start += 1;
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = start;
                return newCounts;
              });

              if (start === target) {
                clearInterval(counter);
              }
            }, increment);
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasCounted]);

  return (
    <div className={styles.productInfoBox} ref={sectionRef}>
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <FaProjectDiagram />
          </div>
          <h4>{counts[0]}+</h4>
          <p>Completed Projects</p>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <FaSmile />
          </div>
          <h4>{counts[1]}+</h4>
          <p>Satisfied Clients</p>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoIcon}>
            <FaAward />
          </div>
          <h4>{counts[2]}+</h4>
          <p>Awards Won</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoBox;
