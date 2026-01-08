"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from './Hero.module.css';

const Hero = () => {
  const [isAndroid, setIsAndroid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof navigator !== "undefined") {
      setIsAndroid(/Android/i.test(navigator.userAgent));
    }
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  // Use consistent className structure for both server and client
  const heroClassName = styles.hero;
  const videoContainerClassName = styles.videoContainer;
  const videoClassName = isMounted 
    ? `${styles.heroVideo} ${isAndroid ? styles.androidVideo : ''} ${isLoaded ? styles.videoLoaded : ''}`
    : styles.heroVideo;

  return (
    <section
      id="Header"
      className={heroClassName}
    >
      <div className={videoContainerClassName}>
        <video
          ref={videoRef}
          className={videoClassName}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          poster="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic-fallback.jpg"
        >
          <source
            src="https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/cinematic.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}></div>
        

      </div>
    </section>
  );
};

export default Hero;