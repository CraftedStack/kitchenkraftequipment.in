"use client";

import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductContainer.css"; // 👈 Import your CSS file here

const ProductContainer = ({ isResell = false }) => {
  const sliderRef = useRef<Slider | null>(null);

  const manufacturingProducts = [
    { title: "Canteen Kitchen Equipment", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/canteen-kitchen-equipment.webp" },
    { title: "Tandoori Oven", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/tandoori-oven.jpg" },
    { title: "Commercial Refrigerators", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg" },
    { title: "Bain Marie", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/bain-marie.png" },
    { title: "Display Counters", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/display-counter.png" },
    { title: "Kitchen Trolley", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/kitchen-trolley.png" },
  ];

  const resellProducts = [
    { title: "Waffle Maker Machine", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/waffle-machine.png" },
    { title: "Sandwich Grillers", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/sandwich-maker.jpg" },
    { title: "Pizza Oven", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/pizza-oven.jpg" },
    { title: "Deep Fryer's", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/EDeep-fryer.jpg" },
    { title: "Griddle Plate", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/griddle-plate.jpg" },
    { title: "Stainless Steel Table", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/stainless-steel-table.jpg" },
    { title: "Burner Cooking Range", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/burning-cooking-range.webp" },
  ];

  const products = isResell ? resellProducts : manufacturingProducts;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerMode: true, centerPadding: "40px" } },
    ],
  };

  const handlePrevClick = () => sliderRef.current?.slickPrev();
  const handleNextClick = () => sliderRef.current?.slickNext();

  const marqueeText = isResell 
    ? [
        "For more information about our Best Sellers, please contact us directly.",
        "उत्पादों के बारे में अधिक जानकारी के लिए, कृपया सीधे हमसे संपर्क करें।",
        "आमच्या उत्पादनांविषयी अधिक माहितीसाठी कृपया थेट आमच्याशी संपर्क साधा."
      ]
    : [
        "For more information about our Manufactured products, please contact us directly.",
        "निर्मित उत्पादों के बारे में अधिक जानकारी के लिए, कृपया सीधे हमसे संपर्क करें।",
        "आमच्या उत्पादनांविषयी अधिक माहितीसाठी कृपया थेट आमच्याशी संपर्क साधा."
      ];

  return (
    <div className={`product-slider-container ${isResell ? "resell" : ""}`}>
      {/* Marquee Info */}
      <div className="info-marquee mb-6">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {marqueeText.map((text, idx) => (
              <span key={idx} className="info-text">{text}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="section-title">{isResell ? "OUR BEST SELLERS" : "OUR MANUFACTURING"}</h2>

      {/* Product Slider */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {products.map((product, idx) => (
            <div key={idx} className="px-2">
              <div className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <h3 className="product-title">{product.title}</h3>
                <button className="inquire-btn">View Details</button>
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigation */}
        <button onClick={handlePrevClick} className="nav-btn prev-btn">❮</button>
        <button onClick={handleNextClick} className="nav-btn next-btn">❯</button>
      </div>
    </div>
  );
};

export default ProductContainer;
