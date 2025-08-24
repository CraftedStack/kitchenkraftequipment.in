"use client";

import React, { useEffect, useState } from "react";
import styles from "./HowWeWork.module.css";
import { convertImagesToFormat } from "./imageUtils";

const HowWeWork = () => {
  const [cards, setCards] = useState([
    {
      title: "Identify the problem",
      description: "We start by analyzing the problem and gathering requirements.",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/kitchen.jpg",
    },
    {
      title: "Design a solution",
      description: "Next, we design a custom solution that addresses the issue at hand.",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/th.jpeg",
    },
    {
      title: "Execute and deliver",
      description: "We implement the solution and deliver the final product to the client.",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/153084695.webp",
    },
  ]);

  useEffect(() => {
    const formatImages = async () => {
      if (cards.length > 0 && !cards[0].image.startsWith("data:image/png")) {
        const updatedCards = await convertImagesToFormat(cards, "image/png");
        setCards(updatedCards);
      }
    };
    formatImages();
  }, []);

  return (
    <section className={`${styles.howWeWork} container my-4`} id="services">
      <h2 className={styles.heading}>How We Work</h2>
      <h3 className={styles.workDescription}>
        Our streamlined preproduction process ensures the highest quality materials, 
        meeting both market demands and regulatory standards with precision and efficiency.
      </h3>

      <div className={styles.cardsContainer}>
        {cards.map((card, index) => (
          <div className={styles.cardWrapper} key={index}>
            <div className={`${styles.card} ${styles.fadeIn}`} style={{ animationDelay: `${index * 0.2}s` }}>
              <div className={styles.imageWrapper}>
                <img src={card.image} alt={card.title} />
              </div>
              <span className={styles.title}>{card.title}</span>
              <p className={styles.description}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;