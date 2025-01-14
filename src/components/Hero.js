import React from 'react';
import './Hero.css';

const Hero = () => {
  // Detect if the user is on Android
  const isAndroid = /Android/i.test(navigator.userAgent);

  return (
    <section className="hero" id="Header">
      <div className="video-container">
        <video
          className="video-fluid"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src={isAndroid ? 'https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic-mobile.mp4' : 'https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic.mp4'}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Hero;
