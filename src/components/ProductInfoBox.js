import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductInfoBox.css';
import { FaUserTie, FaProjectDiagram, FaSmile, FaAward } from 'react-icons/fa'; // Import icons from react-icons

const ProductInfoBox = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasCounted, setHasCounted] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const targets = [25, 15, 50, 10]; // Target numbers for each counter
    const duration = 2000; // Animation duration in milliseconds
    const increments = targets.map((target) => duration / target);

    const handleScroll = () => {
      if (sectionRef.current) {
        const { top } = sectionRef.current.getBoundingClientRect();
        const isVisible = top >= 0 && top <= window.innerHeight;

        if (isVisible && !hasCounted) {
          setHasCounted(true);

          const counters = targets.map((target, index) => {
            let start = 0;
            return setInterval(() => {
              start += 1;
              setCounts((prevCounts) => {
                const newCounts = [...prevCounts];
                newCounts[index] = start;
                return newCounts;
              });
              if (start === target) {
                clearInterval(counters[index]);
              }
            }, increments[index]);
          });

          return () => {
            counters.forEach((counter) => clearInterval(counter));
          };
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasCounted]);

  return (
    <div className="product-info-box container mt-4" ref={sectionRef}>
      <div className="row justify-content-center gap-3">
        <div className="col-12 col-sm-6 col-md-5 mb-3 info-item">
          <div className="info-icon">
            <FaUserTie />
          </div>
          <h4>{counts[0]}+</h4>
          <p>Interior Designers</p>
        </div>
        <div className="col-12 col-sm-6 col-md-5 mb-3 info-item">
          <div className="info-icon">
            <FaProjectDiagram />
          </div>
          <h4>{counts[1]}+</h4>
          <p>Completed Projects</p>
        </div>
        <div className="col-12 col-sm-6 col-md-5 mb-3 info-item">
          <div className="info-icon">
            <FaSmile />
          </div>
          <h4>{counts[2]}+</h4>
          <p>Satisfied Clients</p>
        </div>
        <div className="col-12 col-sm-6 col-md-5 mb-3 info-item">
          <div className="info-icon">
            <FaAward />
          </div>
          <h4>{counts[3]}+</h4>
          <p>Awards Won</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoBox;
