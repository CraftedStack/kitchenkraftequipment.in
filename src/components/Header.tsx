// Header.tsx
import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logoContainer}>
        <img
          src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/logo1-removebg-preview+(1).png"
          alt="Kitchen Kraft Logo"
          className={styles.logo}
          onClick={() => (window.location.href = "/")}
        />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Kitchen Kraft Equipments</h1>
          <p className={styles.tagline}>Premium Kitchen Solutions</p>
        </div>
      </div>

      <button
        className={styles.toggler}
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`${styles.collapse} ${menuOpen ? styles.show : ""}`}>
        <ul className={styles.nav}>
          {[
            { name: "Home", href: "#Header" },
            { name: "Products", href: "#ProductContainer" },
            { name: "Services", href: "#services" },
            { name: "About Us", href: "#About" },
            { name: "Clients", href: "#Clients" },
            { name: "Contact Us", href: "#Contact" }
          ].map((item) => (
            <li key={item.name} className={styles.navItem}>
              <a 
                className={styles.navLink} 
                href={item.href}
                onClick={handleLinkClick}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Floating Call Button */}
      <a href="tel:+918830696290" className={styles.callButton}>
        <FaPhoneAlt className={styles.phoneIcon} /> 
        <span className={styles.callText}>Call Us</span>
      </a>
    </header>
  );
};

export default Header;