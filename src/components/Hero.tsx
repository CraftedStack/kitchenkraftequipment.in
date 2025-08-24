"use client";

import { useEffect, useState, useRef } from "react";
import './Hero.module.css';

const Hero = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsAndroid(/Android/i.test(navigator.userAgent));
    }
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  return (
    <section
      id="Header"
      className="hero relative w-screen flex flex-col justify-start items-center overflow-hidden bg-black"
    >
      {/* Video Container - Full width at top */}
      <div className="video-container w-full">
        <video
          ref={videoRef}
          className={`hero-video ${isAndroid ? 'android-video' : ''} ${isLoaded ? 'video-loaded' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          poster="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic-fallback.jpg"
        >
          <source
            src={
              isAndroid
                ? "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic-mobile.mp4"
                : "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic.mp4"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>


    </section>
  );
};

export default Hero;