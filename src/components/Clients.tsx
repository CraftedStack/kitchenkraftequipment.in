"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import styles from "./Clients.module.css";

export default function Clients() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const elfsightWidget = document.querySelector(
        ".elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc"
      );
      if (elfsightWidget && elfsightWidget.innerHTML.trim() !== "") {
        setWidgetLoaded(true);
        clearInterval(interval);
      }
    }, 1000);

    // Auto-rotate sample reviews
    const reviewInterval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % sampleReviews.length);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(reviewInterval);
    };
  }, []);

  const logos = [
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Nyati.png", alt: "Nyati" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/client2.png", alt: "Swiggy" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/wns.png", alt: "WNS" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/o_hotel.png", alt: "Oxford Hotel" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Smokin'Joe'sLogo.png", alt: "Smokin' Joe's" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/OGR1.png", alt: "OGR" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/siemens.png", alt: "Siemens" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Honeywell.png", alt: "Honeywell" },
    { src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/mastercard-removebg-preview.png", alt: "MasterCard" },
  ];

  const sampleReviews = [
    {
      id: 1,
      author: "Vivek Kumar",
      rating: 5,
      text: "When we were searching for the right kitchen equipment supplier for our café, Kitchen Kraft stood out—and we're so glad we chose them. Their expertise in commercial kitchen solutions is unmatched. Not only did they provide us with top-quality equipment at incredibly competitive prices, but they also offered invaluable guidance on aspects we hadn't even considered.They conducted multiple site visits at no additional cost, ensuring everything was perfectly planned and executed. Their team was professional, punctual, and truly committed to helping us succeed.Thanks to Kitchen Kraft, setting up our café was smooth and stress-free. I wholeheartedly recommend them to anyone looking to build or upgrade a commercial kitchen. Their industry experience and positive energy make all the difference.Thank you, Kitchen Kraft, for being a key part of our success!",
      company: "Local Guide"
    },
    {
      id: 2,
      author: "Priya Sharma",
      rating: 5,
      text: "Great service and high-quality kitchen solutions. Highly recommended for hospitality businesses in Mumbai. The installation team was very professional.",
      company: "Hotel Manager"
    },
    {
      id: 3,
      author: "Amit Patel",
      rating: 4,
      text: "Good quality equipment and professional installation service. Timely delivery and good customer support. Would recommend for commercial kitchen setups.",
      company: "Catering Service"
    },
    {
      id: 4,
      author: "Sneha Desai",
      rating: 5,
      text: "The customized kitchen layout has improved our workflow significantly. Thank you Kitchen Kraft team for the excellent design and installation!",
      company: "Food Business Owner"
    },
    {
      id: 5,
      author: "Vikram Singh",
      rating: 5,
      text: "Best commercial kitchen equipment supplier in India. Reliable products and excellent after-sales service. Great partnership for our hotel chain.",
      company: "Hospitality Group"
    }
  ];

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % sampleReviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + sampleReviews.length) % sampleReviews.length);
  };

  const goToReview = (index) => {
    setCurrentReview(index);
  };

  const toggleExpand = (reviewId) => {
    setExpandedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const ReviewText = ({ review }) => {
    const isExpanded = expandedReviews[review.id];
    const needsTruncation = review.text.length > 150;
    const displayText = isExpanded ? review.text : truncateText(review.text);

    return (
      <p className={styles.reviewText}>
        "{displayText}"
        {needsTruncation && (
          <button
            className={styles.readMoreButton}
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(review.id);
            }}
          >
            {isExpanded ? ' show less' : ' more'}
          </button>
        )}
      </p>
    );
  };

  return (
    <section id="Clients" className={styles.clientsSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Clients</h2>

        {/* Marquee */}
        <Marquee
          gradient={false}
          speed={80}
          direction="left"
          className={styles.clientsMarquee}
        >
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className={styles.carouselImage}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className={styles.logoImage}
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Reviews */}
      <div className={styles.reviews}>
        <h3 className={styles.reviewsHeading}>
          Client Reviews
        </h3>

        <div className={styles.reviewsContainer}>
          <div className="elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc"></div>

          {!widgetLoaded && (
            <div className={styles.reviewsCarousel}>
              <div className={styles.loadingText}>
                🔄 Loading Reviews...
              </div>
              
              {/* Reviews Carousel */}
              <div className={styles.carouselContainer}>
                <button 
                  className={styles.carouselButton} 
                  onClick={prevReview}
                  aria-label="Previous review"
                >
                  ‹
                </button>
                
                <div className={styles.carouselSlide}>
                  <div className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewAuthor}>
                        <strong>{sampleReviews[currentReview].author}</strong>
                        <span className={styles.reviewCompany}>
                          {sampleReviews[currentReview].company}
                        </span>
                      </div>
                      <div className={styles.reviewRating}>
                        {renderStars(sampleReviews[currentReview].rating)}
                      </div>
                    </div>
                    <ReviewText review={sampleReviews[currentReview]} />
                  </div>
                </div>
                
                <button 
                  className={styles.carouselButton} 
                  onClick={nextReview}
                  aria-label="Next review"
                >
                  ›
                </button>
              </div>

              {/* Dots Indicator */}
              <div className={styles.carouselDots}>
                {sampleReviews.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentReview ? styles.activeDot : ''}`}
                    onClick={() => goToReview(index)}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}