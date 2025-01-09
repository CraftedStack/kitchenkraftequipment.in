import React from 'react';
import Marquee from 'react-fast-marquee';
import './Clients.css';

const Clients = () => {
  return (
    <section className="clients-section py-5" id="Clients">
      <div className="container text-center">
        <h2 className="mb-4">Our Clients</h2>
        <Marquee 
          gradient={false} 
          speed={80} 
          direction="left"
          className="clients-marquee"
        >
          <div className="carousel-image">
            <img src="Nyati.png" alt="Client 1" />
          </div>
          <div className="carousel-image">
            <img src="client2.png" alt="swiggy" />
          </div>
          <div className="carousel-image">
            <img src="wns.png" alt="WNS" />
          </div>
          <div className="carousel-image">
            <img src="o_hotel.png" alt="oxford hotel" />
          </div>
          <div className="carousel-image">
            <img src="Smokin'Joe'sLogo.png" alt="" />
          </div>
          <div className="carousel-image">
            <img src="OGR1.png" alt="Client 6" />
          </div>
          <div className="carousel-image">
            <img src="siemens.png" alt="Client 7" />
          </div>
          <div className="carousel-image">
            <img src="Honeywell.png" alt="Client 8" />
          </div>
        </Marquee>
      </div>
      <div className="reviews mt-4" style={{ textAlign: 'center' }}>
        <h3>Client Reviews</h3>
        <div className="elfsight-widget">
          <div className="elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc"></div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
