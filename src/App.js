import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Clients from './components/Clients';
import AboutUs from './components/AboutUs';
import ProductContainer from './components/ProductContainer';
import ProductInfoBox from './components/ProductInfoBox';
import HowWeWork from './components/HowWeWork';
import Footer from './components/Footer';
import ProductContainerResell from './components/ProductContainerResell';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Hero />
        <Routes>
          {/* Define routes if you want to navigate between pages */}
          <Route path="/" element={<ProductContainer />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/product-info" element={<ProductInfoBox />} />
          {/* Add more routes as needed */}
        </Routes>
        <ProductContainerResell/>
        <HowWeWork />
        <AboutUs/>
        <ProductInfoBox/>
        <Clients />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
