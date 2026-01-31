"use client";

import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { getDisplayImageUrl } from "@/lib/imageUtils";

// Define types
interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  company: string;
  date: string;
  avatar?: string;
}

interface Logo {
  src: string;
  alt: string;
  name: string;
}

export default function Clients() {
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [currentReview, setCurrentReview] = useState<number>(0);
  const [expandedReviews, setExpandedReviews] = useState<Record<number, boolean>>({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

    // Auto-rotate reviews only if auto-playing
    let reviewInterval: NodeJS.Timeout;
    if (isAutoPlaying) {
      reviewInterval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % sampleReviews.length);
      }, 5000);
    }

    return () => {
      clearInterval(interval);
      if (reviewInterval) clearInterval(reviewInterval);
    };
  }, [isAutoPlaying]);

  const logos: Logo[] = [
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Nyati.png",
      alt: "Nyati Group",
      name: "Nyati Group"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/client2.png",
      alt: "Swiggy",
      name: "Swiggy"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/wns.png",
      alt: "WNS Global Services",
      name: "WNS"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/o_hotel.png",
      alt: "Oxford Hotel",
      name: "Oxford Hotel"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Smokin'Joe'sLogo.png",
      alt: "Smokin' Joe's Pizza",
      name: "Smokin' Joe's"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/OGR1.png",
      alt: "OGR Group",
      name: "OGR Group"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/siemens.png",
      alt: "Siemens",
      name: "Siemens"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Honeywell.png",
      alt: "Honeywell",
      name: "Honeywell"
    },
    {
      src: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/mastercard-removebg-preview.png",
      alt: "MasterCard",
      name: "MasterCard"
    },
  ];

  const sampleReviews: Review[] = [
    {
      id: 1,
      author: "Vivek Kumar",
      rating: 5,
      text: "When we were searching for the right kitchen equipment supplier for our café, Kitchen Kraft stood out with their exceptional service and quality products. The team was professional, responsive, and delivered exactly what we needed within our budget and timeline.",
      company: "Café Owner",
      date: "2 months ago",
      avatar: "VK"
    },
    {
      id: 2,
      author: "Priya Sharma",
      rating: 5,
      text: "Outstanding service and high-quality kitchen solutions! Kitchen Kraft transformed our hotel kitchen with state-of-the-art equipment. Their attention to detail and post-installation support has been exceptional. Highly recommended for hospitality businesses.",
      company: "Hotel Manager",
      date: "3 months ago",
      avatar: "PS"
    },
    {
      id: 3,
      author: "Amit Patel",
      rating: 4,
      text: "Good quality equipment and professional installation service. The team was punctual, efficient, and ensured everything was working perfectly before leaving. Their customer support has been responsive to our queries.",
      company: "Catering Service",
      date: "1 month ago",
      avatar: "AP"
    },
    {
      id: 4,
      author: "Sneha Desai",
      rating: 5,
      text: "The customized kitchen layout designed by Kitchen Kraft has significantly improved our workflow and efficiency. The equipment quality is excellent and the installation was seamless. Great value for money!",
      company: "Restaurant Owner",
      date: "4 months ago",
      avatar: "SD"
    },
    {
      id: 5,
      author: "Vikram Singh",
      rating: 5,
      text: "Best commercial kitchen equipment supplier we've worked with! Their products are reliable, durable, and the after-sales service is outstanding. They've been our trusted partner for multiple projects across our hospitality chain.",
      company: "Hospitality Group",
      date: "6 months ago",
      avatar: "VS"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const nextReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev + 1) % sampleReviews.length);
  };

  const prevReview = () => {
    setIsAutoPlaying(false);
    setCurrentReview((prev) => (prev - 1 + sampleReviews.length) % sampleReviews.length);
  };

  const goToReview = (index: number): void => {
    setIsAutoPlaying(false);
    setCurrentReview(index);
  };

  const toggleExpand = (reviewId: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const truncateText = (text: string, maxLength: number = 120): string => {
    return text.length <= maxLength ? text : text.substring(0, maxLength) + "...";
  };

  const ReviewText: React.FC<{ review: Review }> = ({ review }) => {
    const isExpanded = expandedReviews[review.id];
    const needsTruncation = review.text.length > 120;
    const displayText = isExpanded ? review.text : truncateText(review.text);

    return (
      <p className="text-gray-700 text-base md:text-lg leading-relaxed italic mb-4 font-light">
        "{displayText}"
        {needsTruncation && (
          <button
            className="text-blue-600 hover:text-blue-800 font-medium ml-1 transition-colors text-sm not-italic"
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(review.id);
            }}
          >
            {isExpanded ? " Show less" : " Read more"}
          </button>
        )}
      </p>
    );
  };

  return (
    <section className="py-6 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Trusted by Leading Businesses
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-2 md:px-4 leading-relaxed">
            From fine dining restaurants to large hotel chains, businesses across Pune trust
            Kitchen Kraft Equipments for their commercial kitchen needs.
          </p>
        </div>

        {/* Client Logos Marquee - FINAL FIX: No Vertical Scroll, No Overlap */}
        <div className="mb-8 md:mb-16">
          {/* Fixed viewport container - shows exactly ~4 logos */}
          <div className="w-full max-w-6xl mx-auto px-4">
            <div className="relative bg-white rounded-xl shadow-lg border border-gray-100">
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              {/* Fixed height container - prevents vertical scroll */}
              <div className="h-24 flex items-center overflow-hidden">
                <Marquee
                  gradient={false}
                  speed={30}
                  direction="left"
                  pauseOnHover={true}
                  autoFill={true}
                  className="select-none h-full flex items-center"
                  style={{ height: '96px' }}
                >
                  {/* Logos with AutoFill */}
                  {logos.map((logo, idx) => (
                    <div
                      key={`logo-${idx}`}
                      className="flex items-center justify-center mx-4 md:mx-8"
                      style={{ height: '96px' }}
                    >
                      {/* Fixed size logo container - prevents overlap */}
                      <div className="group flex items-center justify-center w-32 h-20 md:w-40 md:h-24 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 p-3 md:p-4 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex-shrink-0">
                        <img
                          src={getDisplayImageUrl(logo.src) || logo.src}
                          alt={logo.alt}
                          className="w-full h-full object-contain group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          loading="lazy"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>

          {/* Trust indicators - simplified layout */}
          <div className="flex flex-wrap items-center justify-center mt-6 gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">500+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Industry Leaders</span>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-2">
              What Our Clients Say
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Real feedback from businesses we've helped transform their kitchens
            </p>
          </div>

          {/* Elfsight Widget Container */}
          <div className="mb-8">
            <div className="elfsight-app-1ab142a6-cfb9-49b4-9971-f31fb108c7dc"></div>
          </div>

          {/* Fallback Reviews Carousel */}
          {!widgetLoaded && (
            <div className="relative px-2 md:px-4">
              {/* Review Carousel */}
              <div className="relative">
                <div className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
                  <div className="flex items-start space-x-3 md:space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs md:text-sm">
                        {sampleReviews[currentReview].avatar}
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                            {sampleReviews[currentReview].author}
                          </h4>
                          <p className="text-xs md:text-sm text-gray-600">
                            {sampleReviews[currentReview].company}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {renderStars(sampleReviews[currentReview].rating)}
                        </div>
                      </div>

                      <ReviewText review={sampleReviews[currentReview]} />

                      <div className="text-xs text-gray-500">
                        {sampleReviews[currentReview].date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevReview}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 md:-translate-x-2 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-600 hover:text-blue-600 border border-gray-200 z-10"
                  aria-label="Previous review"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={nextReview}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1 md:translate-x-2 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-gray-600 hover:text-blue-600 border border-gray-200 z-10"
                  aria-label="Next review"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots Indicator - Smaller on mobile */}
              <div className="flex justify-center space-x-1.5 md:space-x-2 mt-4">
                {sampleReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`rounded-full transition-all duration-300 ${index === currentReview
                      ? 'bg-blue-600 w-4 h-1 md:w-6 md:h-2'
                      : 'bg-gray-300 w-1 h-1 md:w-2 md:h-2 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              {/* Auto-play Control */}
              <div className="text-center mt-3">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {isAutoPlaying ? (
                    <span className="flex items-center justify-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                      </svg>
                      <span>Pause</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1" />
                      </svg>
                      <span>Play</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
