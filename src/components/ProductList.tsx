"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ProductList.module.css";

const mockCategories: Record<string, { title: string; products: { name: string; price: string; img: string }[] }> = {
  kitchen: {
    title: "Kitchen Equipment",
    products: [
      { name: "Stainless Sink", price: "$120", img: "/imgs/sink.jpg" },
      { name: "Gas Stove", price: "$300", img: "/imgs/stove.jpg" },
    ],
  },
  bakery: {
    title: "Bakery Equipment",
    products: [
      { name: "Oven", price: "$500", img: "/imgs/oven.jpg" },
      { name: "Mixer", price: "$200", img: "/imgs/mixer.jpg" },
    ],
  },
};

function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryKey = searchParams.get("category");
  const category = categoryKey ? mockCategories[categoryKey] : null;

  if (!category) {
    return <h2>No products found! Please go back.</h2>;
  }

  return (
    <div className={styles.productListContainer}>
      <button className={styles.backBtn} onClick={() => router.push("/")}>
        ⬅ Back
      </button>
      <h2>{category.title}</h2>
      <div className={styles.gridContainer}>
        {category.products.map((product, index) => (
          <div className={styles.gridItem} key={index}>
            <img src={product.img} alt={product.name} className={styles.productImage} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
