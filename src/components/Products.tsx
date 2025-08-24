"use client";

import React from "react";
import Image from "next/image";
import styles from "./Products.module.css";

type CardProps = {
  imageUrl: string;
  title: string;
  category: string;
  author: string;
  date: string;
};

const Card: React.FC<CardProps> = ({ imageUrl, title, category, author, date }) => {
  return (
    <div className={`${styles.card} shadow`}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={180}
          className={styles.cardImage}
        />
        <div className={styles.category}>{category}</div>
      </div>
      <div className={styles.cardInfo}>
        <p className={styles.title}>{title}</p>
        <div className={styles.author}>
          <span className={styles.name}>{author}</span> {date}
        </div>
      </div>
    </div>
  );
};

export default Card;
