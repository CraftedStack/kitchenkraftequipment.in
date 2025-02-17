import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import './Clients.css';

const Clients = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const elfsightWidget = document.querySelector('.elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc');
      if (elfsightWidget && elfsightWidget.innerHTML.trim() !== '') {
        setWidgetLoaded(true);
        clearInterval(interval); // Stop checking once loaded
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

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
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Nyati.png" alt="Nyati" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/client2.png" alt="Swiggy" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/wns.png" alt="WNS" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/o_hotel.png" alt="Oxford Hotel" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Smokin'Joe'sLogo.png" alt="Smokin' Joe's" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/OGR1.png" alt="OGR" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/siemens.png" alt="Siemens" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Honeywell.png" alt="Honeywell" />
          </div>
        </Marquee>
      </div>

      <div className="reviews mt-4 text-center">
        <h3>Client Reviews</h3>
        
        {/* Widget is ALWAYS rendered */}
        <div className="elfsight-widget">
          <div className="elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc"></div>

          {/* Show "Reviews Coming Soon..." only until widget loads */}
          {!widgetLoaded && (
            <div className="coming-soon">
              <p>🔄 Reviews Coming Soon...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Clients;
