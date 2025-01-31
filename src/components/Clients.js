import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import './Clients.css';

const Clients = () => {
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  useEffect(() => {
    const checkWidget = setTimeout(() => {
      const elfsightWidget = document.querySelector('.elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc');
      if (elfsightWidget && elfsightWidget.innerHTML.trim() !== '') {
        setWidgetLoaded(true);
      }
    }, 5000); // Check after 5 seconds

    return () => clearTimeout(checkWidget);
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
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/client2.png" alt="swiggy" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/wns.png" alt="WNS" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/o_hotel.png" alt="oxford hotel" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Smokin'Joe'sLogo.png" alt="" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/OGR1.png" alt="Client 6" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/siemens.png" alt="Client 7" />
          </div>
          <div className="carousel-image">
            <img src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Honeywell.png" alt="Client 8" />
          </div>
        </Marquee>
      </div>
      <div className="reviews mt-4" style={{ textAlign: 'center' }}>
        <h3>Client Reviews</h3>
        <div className="elfsight-widget">
          {widgetLoaded ? (
            <div className="elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc"></div>
          ) : (
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
