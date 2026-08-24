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

  const handleVideoError = (e: any) => {
    console.error('Video failed to load:', e);
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
        {/*
          Video and poster are served from /public via Amplify's CloudFront.
          They previously pointed straight at S3 and returned 403 (the bucket is
          private, which is why images go through the backend image proxy), and
          the poster did not exist in the bucket at all.

          The source was 1920x1080 / 44.7s / 11.5 Mbps with an unused audio
          track = 61.3MB on every homepage visit. Re-encoded to a 12s muted loop
          at 1.8MB. preload="metadata" fetches only the header, so nothing
          downloads the full clip before playback starts.
        */}
        <video
          ref={videoRef}
          className={videoClassName}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          preload="metadata"
          poster="/cinematic-poster.jpg"
        >
          <source src="/cinematic-web.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}></div>
        

      </div>
    </section>
  );
};

export default Hero;