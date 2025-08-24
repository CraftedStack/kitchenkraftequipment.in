"use client";

import { useState } from "react";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("Tab1");

  return (
    <section
      id="About"
      className={styles.aboutUs}
    >
      <h2 className={styles.heading}>About Us</h2>
      <p className={styles.subheading}>
        At Kitchen Kraft Equipments, we specialize in designing, manufacturing,
        and delivering top-of-the-line commercial kitchen solutions tailored for
        businesses that demand excellence. With a focus on innovation,
        durability, and functionality, our products empower culinary
        professionals to create exceptional experiences efficiently and
        effectively.
      </p>

      {/* Tab Buttons */}
      <div className={styles.customButtonContainer}>
        <button
          onClick={() => setActiveTab("Tab1")}
          className={`${styles.customButton} ${
            activeTab === "Tab1" ? styles.customButtonActive : ""
          }`}
        >
          Quality & Durability
        </button>
        <button
          onClick={() => setActiveTab("Tab2")}
          className={`${styles.customButton} ${
            activeTab === "Tab2" ? styles.customButtonActive : ""
          }`}
        >
          Customized Solutions
        </button>
        <button
          onClick={() => setActiveTab("Tab3")}
          className={`${styles.customButton} ${
            activeTab === "Tab3" ? styles.customButtonActive : ""
          }`}
        >
          Reasonable Prices
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "Tab1" && (
          <p>
            Our products are crafted with premium-grade materials to withstand
            the demands of high-performance commercial kitchens. Each piece is
            rigorously tested to ensure long-lasting reliability and flawless
            functionality.
          </p>
        )}
        {activeTab === "Tab2" && (
          <p>
            We specialize in designing tailored kitchen equipment that fits your
            unique space and operational needs. From concept to installation,
            our team collaborates with you to create solutions that enhance
            efficiency and workflow.
          </p>
        )}
        {activeTab === "Tab3" && (
          <p>
            We offer top-quality commercial kitchen equipment at competitive
            prices, ensuring value without compromise. Our goal is to make
            excellence affordable for businesses of all sizes.
          </p>
        )}
      </div>
    </section>
  );
}