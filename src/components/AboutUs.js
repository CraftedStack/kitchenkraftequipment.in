import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('Tab1');

  return (
    <section className="about-us container py-5" id="About">
      <h2 className="text-center mb-4">About Us</h2>
      <p className="text-center mb-5">At Kitchen Kraft Equipments, we specialize in designing, manufacturing, and delivering top-of-the-line commercial kitchen solutions tailored for businesses that demand excellence. With a focus on innovation, durability, and functionality, our products empower culinary professionals to create exceptional experiences efficiently and effectively.</p>
      
      <div className="custom-button-container btn-group d-flex justify-content-center mb-4" role="group">
        <button 
          onClick={() => setActiveTab('Tab1')} 
          className={`custom-button ${activeTab === 'Tab1' ? 'custom-button-active' : ''}`}>
         Quality & Durability
        </button>
        <button 
          onClick={() => setActiveTab('Tab2')} 
          className={`custom-button ${activeTab === 'Tab2' ? 'custom-button-active' : ''}`}>
          Customized Solutions
        </button>
        <button 
          onClick={() => setActiveTab('Tab3')} 
          className={`custom-button ${activeTab === 'Tab3' ? 'custom-button-active' : ''}`}>
          Reasonable Prices
        </button>
      </div>

      <div className="tab-content mx-auto p-4 bg-white shadow-sm rounded">
        {activeTab === 'Tab1' && <p>Our products are crafted with premium-grade materials to withstand the demands of high-performance commercial kitchens. Each piece is rigorously tested to ensure long-lasting reliability and flawless functionality.</p>}
        {activeTab === 'Tab2' && <p>We specialize in designing tailored kitchen equipment that fits your unique space and operational needs. From concept to installation, our team collaborates with you to create solutions that enhance efficiency and workflow.</p>}
        {activeTab === 'Tab3' && <p>We offer top-quality commercial kitchen equipment at competitive prices, ensuring value without compromise. Our goal is to make excellence affordable for businesses of all sizes.</p>}
      </div>
    </section>
  );
};

export default AboutUs;
