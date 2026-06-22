"use client";

import { useEffect, useRef, useState } from "react";
import { getDisplayImageUrl } from "@/lib/imageUtils";

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  company: string;
  date: string;
  avatar: string;
}

interface Logo {
  src: string;
  alt: string;
  name: string;
}

// Base URL for images — uses backend proxy to avoid direct S3 public access
const IMG_BASE = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/images/imgs`;

const logos: Logo[] = [
  { src: `${IMG_BASE}/Nyati.png`, alt: "Nyati Group", name: "Nyati Group" },
  { src: `${IMG_BASE}/client2.png`, alt: "Swiggy", name: "Swiggy" },
  { src: `${IMG_BASE}/wns.png`, alt: "WNS Global Services", name: "WNS" },
  { src: `${IMG_BASE}/o_hotel.png`, alt: "Oxford Hotel", name: "Oxford Hotel" },
  { src: `${IMG_BASE}/Smokin'Joe'sLogo.png`, alt: "Smokin' Joe's Pizza", name: "Smokin' Joe's" },
  { src: `${IMG_BASE}/OGR1.png`, alt: "OGR Group", name: "OGR Group" },
  { src: `${IMG_BASE}/siemens.png`, alt: "Siemens", name: "Siemens" },
  { src: `${IMG_BASE}/Honeywell.png`, alt: "Honeywell", name: "Honeywell" },
  { src: `${IMG_BASE}/mastercard-removebg-preview.png`, alt: "MasterCard", name: "MasterCard" },
];

const sampleReviews: Review[] = [
  {
    id: 1,
    author: "Vivek Kumar",
    rating: 5,
    text: "When we were searching for the right kitchen equipment supplier for our café, Kitchen Kraft stood out with their exceptional service and quality products. The team was professional, responsive, and delivered exactly what we needed within our budget and timeline.",
    company: "Café Owner",
    date: "2 months ago",
    avatar: "VK",
  },
  {
    id: 2,
    author: "Priya Sharma",
    rating: 5,
    text: "Outstanding service and high-quality kitchen solutions! Kitchen Kraft transformed our hotel kitchen with state-of-the-art equipment. Their attention to detail and post-installation support has been exceptional. Highly recommended for hospitality businesses.",
    company: "Hotel Manager",
    date: "3 months ago",
    avatar: "PS",
  },
  {
    id: 3,
    author: "Amit Patel",
    rating: 4,
    text: "Good quality equipment and professional installation service. The team was punctual, efficient, and ensured everything was working perfectly before leaving. Their customer support has been responsive to our queries.",
    company: "Catering Service",
    date: "1 month ago",
    avatar: "AP",
  },
  {
    id: 4,
    author: "Sneha Desai",
    rating: 5,
    text: "The customized kitchen layout designed by Kitchen Kraft has significantly improved our workflow and efficiency. The equipment quality is excellent and the installation was seamless. Great value for money!",
    company: "Restaurant Owner",
    date: "4 months ago",
    avatar: "SD",
  },
  {
    id: 5,
    author: "Vikram Singh",
    rating: 5,
    text: "Best commercial kitchen equipment supplier we've worked with! Their products are reliable, durable, and the after-sales service is outstanding. They've been our trusted partner for multiple projects across our hospitality chain.",
    company: "Hospitality Group",
    date: "6 months ago",
    avatar: "VS",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 130;
  const long = review.text.length > LIMIT;
  const displayText = expanded || !long ? review.text : review.text.slice(0, LIMIT) + "…";

  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full">
      {/* Quote mark */}
      <div className="text-blue-200 text-4xl font-serif leading-none select-none mb-3">&ldquo;</div>

      {/* Review text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
        {displayText}
        {long && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-blue-500 hover:text-blue-700 font-medium text-xs"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {review.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 truncate">{review.author}</p>
          <p className="text-xs text-gray-500 truncate">{review.company}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <StarRating rating={review.rating} />
          <p className="text-xs text-gray-400 mt-0.5">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

// Card dimensions per breakpoint
const CARD = {
  desktop: { w: 130, h: 76, gap: 16 },
  mobile:  { w: 88,  h: 60, gap: 10 },
};

export default function Clients() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Refs for pixel-accurate keyframe injection
  const trackRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const inject = () => {
      const isMobile = window.innerWidth < 768;
      const card = isMobile ? CARD.mobile : CARD.desktop;
      // One copy = logos.length cards, each (w + gap) px wide
      const oneCopyPx = logos.length * (card.w + card.gap);
      // Duration: ~80px/s on desktop, ~60px/s on mobile — feels natural
      const duration = Math.round(oneCopyPx / (isMobile ? 55 : 72));

      const css = `
        @keyframes logo-scroll-exact {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(-${oneCopyPx}px); }
        }
        .logo-track {
          animation: logo-scroll-exact ${duration}s linear infinite;
        }
      `;

      if (!styleRef.current) {
        styleRef.current = document.createElement("style");
        styleRef.current.id = "logo-ticker-keyframe";
        document.head.appendChild(styleRef.current);
      }
      styleRef.current.textContent = css;

      // Apply matching card size to all cards in the track
      if (trackRef.current) {
        const cards = trackRef.current.querySelectorAll<HTMLElement>(".logo-card");
        cards.forEach((el) => {
          el.style.width  = `${card.w}px`;
          el.style.height = `${card.h}px`;
          el.style.marginRight = `${card.gap}px`;
        });
      }
    };

    inject();

    const onResize = () => inject();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      styleRef.current?.remove();
      styleRef.current = null;
    };
  }, []);

  // Auto-rotate carousel on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setInterval(() => {
      setCurrentReview((p) => (p + 1) % sampleReviews.length);
    }, 5000);
    return () => clearInterval(t);
  }, [isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentReview((p) => (p - 1 + sampleReviews.length) % sampleReviews.length);
  };
  const next = () => {
    setIsAutoPlaying(false);
    setCurrentReview((p) => (p + 1) % sampleReviews.length);
  };

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header — matches site dark-blue + gold bar style ── */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-2xl md:text-4xl font-bold uppercase tracking-wide mb-3"
            style={{ color: "#0d47a1" }}
          >
            Trusted by Leading Businesses
          </h2>
          {/* Gold → dark-blue gradient underline bar */}
          <div
            className="mx-auto rounded-full mb-4"
            style={{
              width: 72,
              height: 4,
              background: "linear-gradient(90deg, #ffb300, #0d47a1)",
            }}
          />
          <p
            className="text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#546e7a" }}
          >
            From fine dining restaurants to large hotel chains, businesses across Pune trust
            Kitchen Kraft Equipments for their commercial kitchen needs.
          </p>
        </div>

        {/* ── Client logo marquee ── */}
        <div className="mb-10 md:mb-16">

          {/* Sub-heading — matches site style (dark blue + gold underline bar) */}
          <div className="text-center mb-6 md:mb-8">
            <h3
              className="text-lg md:text-xl font-bold uppercase tracking-widest mb-3"
              style={{ color: "#0d47a1" }}
            >
              Our Clients
            </h3>
            {/* Gold → dark-blue gradient underline bar, same as HowWeWork / AboutUs */}
            <div
              className="mx-auto rounded-full"
              style={{
                width: 56,
                height: 4,
                background: "linear-gradient(90deg, #ffb300, #0d47a1)",
              }}
            />
          </div>

          {/*
            Marquee wrapper.
            - White card with 12px radius + subtle shadow matching site card style.
            - Fade edges use the same white as the card background so the blend is seamless.
            - overflow-hidden only on the inner scroll strip, not the outer card,
              so the border-radius and shadow render correctly.
            - Logos are tripled manually so the strip is always full regardless of
              how many logos exist — adding more to the logos array just works.
          */}
          {/*
            Pure CSS ticker — no third-party library.
            .logo-ticker  = overflow:hidden + mask fade edges
            .logo-track   = inline-flex animated with translateX(-50%)
            We render logos TWICE side by side. The animation moves left by
            exactly 50% (= one full copy width), then jumps back to 0 —
            seamless loop regardless of how many logos there are.
          */}
          <div
            className="bg-white border border-gray-100"
            style={{ borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.08)", padding: "18px 0" }}
          >
            <div className="logo-ticker">
              <div className="logo-track" ref={trackRef}>
                {/* Render logos TWICE — animation moves exactly one copy's pixel width, then resets seamlessly */}
                {[...logos, ...logos].map((logo, idx) => (
                  <div
                    key={idx}
                    className="logo-card"
                    style={{
                      flexShrink: 0,
                      /* Start with desktop values; useEffect overwrites on mobile */
                      width: 130,
                      height: 76,
                      marginRight: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      border: "1.5px solid #e5e7eb",
                      background: "#f9fafb",
                      padding: 12,
                      transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "#e3f2fd";
                      el.style.borderColor = "#1e88e5";
                      el.style.boxShadow = "0 4px 14px rgba(30,136,229,0.18)";
                      el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "#f9fafb";
                      el.style.borderColor = "#e5e7eb";
                      el.style.boxShadow = "none";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <img
                      src={getDisplayImageUrl(logo.src) || logo.src}
                      alt={logo.alt}
                      loading="lazy"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        opacity: 0.7,
                        transition: "opacity 0.25s",
                        display: "block",
                        /* Prevent the global img rule from distorting */
                        height: "auto",
                      }}
                      onMouseEnter={(e) => { (e.target as HTMLImageElement).style.opacity = "1"; }}
                      onMouseLeave={(e) => { (e.target as HTMLImageElement).style.opacity = "0.7"; }}
                      onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust stats — styled to match site accent colors */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-10 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#e8f5e9" }}
              >
                <svg className="w-4 h-4" style={{ color: "#388e3c" }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold" style={{ color: "#37474f" }}>500+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#e3f2fd" }}
              >
                <svg className="w-4 h-4" style={{ color: "#1e88e5" }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold" style={{ color: "#37474f" }}>15+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "#fff8e1" }}
              >
                <svg className="w-4 h-4" style={{ color: "#ffb300" }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold" style={{ color: "#37474f" }}>Industry Leaders</span>
            </div>
          </div>
        </div>

        {/* ── Reviews section ── */}
        <div>
          <div className="text-center mb-8">
            <h3
              className="text-xl md:text-3xl font-bold uppercase tracking-wide mb-3"
              style={{ color: "#0d47a1" }}
            >
              What Our Clients Say
            </h3>
            <div
              className="mx-auto rounded-full mb-3"
              style={{
                width: 56,
                height: 4,
                background: "linear-gradient(90deg, #ffb300, #0d47a1)",
              }}
            />
            <p className="text-sm md:text-base" style={{ color: "#546e7a" }}>
              Real feedback from businesses we&apos;ve helped transform their kitchens
            </p>
          </div>

          {/* ── Desktop: 3-column grid (md+) — always visible ── */}
          <div className="hidden md:grid md:grid-cols-3 gap-5">
            {sampleReviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {/* ── Mobile: single-card carousel ── */}
          <div className="md:hidden">
            <div className="relative px-10">
              <ReviewCard review={sampleReviews[currentReview]} />

              {/* Prev */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Previous review"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors"
                aria-label="Next review"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center items-center gap-1.5 mt-4">
              {sampleReviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setIsAutoPlaying(false); setCurrentReview(i); }}
                  aria-label={`Go to review ${i + 1}`}
                  style={{
                    /* globals.css forces min-height:44px on all buttons on mobile
                       which is what inflates each dot into a huge block */
                    minHeight: "unset",
                    minWidth: "unset",
                    padding: 0,
                    margin: 0,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    /* Generous tap target without affecting visible layout */
                    width: 20,
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      borderRadius: 9999,
                      height: 5,
                      width: i === currentReview ? 16 : 6,
                      background: i === currentReview ? "#1e88e5" : "#d1d5db",
                      transition: "width 0.3s ease, background 0.3s ease",
                      flexShrink: 0,
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Auto-play toggle */}
            <div className="text-center mt-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {isAutoPlaying ? (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                    </svg>
                    Pause
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    </svg>
                    Play
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
