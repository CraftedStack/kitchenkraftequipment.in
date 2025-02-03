// Header.js
import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <img src='https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/logo1-removebg-preview+(1).png' alt=''></img>
        <h1><u>Kitchen Kraft Equipments </u></h1>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#Header">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#ProductContainer">Products</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#About">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Clients">Clients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <a href="tel:+918830696290" class="call-button">
  <i class="fas fa-phone-alt"></i> Call Us
</a>
      </div>
    </header>
  );
};

export default Header;
