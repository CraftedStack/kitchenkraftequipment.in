"use client";

import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProductContainer.css";

// Define TypeScript interfaces
interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface ProductDatabase {
  [key: string]: Product[];
}

interface ProductDetailsModalProps {
  productTitle: string | null;
  isOpen: boolean;
  onClose: () => void;
  isResell?: boolean;
}

// Product Details Modal Component
const ProductDetailsModal = ({ productTitle, isOpen, onClose, isResell }: ProductDetailsModalProps) => {
  // Sample data for demonstration - in a real app, this would come from an API
  const productDatabase: ProductDatabase = {
    "Canteen Kitchen Equipment": [
      { id: 1, name: "G.I Ducting Line and Stainless Steel Hood", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/Kitchen_equipment_G.I_Ducting_Line_and_Stainless_Steel_Hood.png", description: "Complete canteen kitchen setup" },
      { id: 2, name: "Canteen Foldable Table", image: "https://example.com/cooking-range.jpg", description: "Steel Canteen Foldable table for 4 to 12" },
      { id: 3, name: "Dough Kneaders", image: "https://example.com/cooking-range.jpg", description: "Stainless steel Dough mixing machine 7Kg to 50KG" },
      { id: 4, name: "Canteen Foldable Table", image: "https://example.com/cooking-range.jpg", description: "Canteen Foldable table for 4 to 12" },
    ],
    "SS Tandoori Bhatti": [
      { id: 1, name: "Clay Tandoor Bhatti", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/tandoori-oven.jpg", description: "Authentic clay tandoor for restaurants,Hotel, Commercial & Industrial" },
      { id: 2, name: "Electric Tandoor Bhatti", image: "https://example.com/commercial-tandoor.jpg", description: "Authentic Stainless Steel Tandoor Bhatti electricity for restaurants,Hotel, Commercial & Industrial" },
      { id: 3, name: "Charcoal Tandoor Bhatti", image: "https://example.com/commercial-tandoor.jpg", description: "Authentic Stainless Steel Tandoor Bhatti Charcoal for restaurants,Hotel, Commercial & Industrial" },
    ],
    "Commercial Refrigerators": [
      { id: 1, name: "2 Door Commercial Refrigerator", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "2 Door large capacity commercial refrigerator" },
      { id: 2, name: "2 Door Commercial Freezer", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "2 Door large capacity commercial freezer" },
      { id: 3, name: "2 Door Commercial Chiller", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "2 Door large capacity commercial chiller" },

      // 3 Door variants
      { id: 4, name: "3 Door Commercial Refrigerator", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "3 Door large capacity commercial refrigerator" },
      { id: 5, name: "3 Door Commercial Freezer", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "3 Door large capacity commercial freezer" },
      { id: 6, name: "3 Door Commercial Chiller", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "3 Door large capacity commercial chiller" },

      // 4 Door variants
      { id: 7, name: "4 Door Commercial Refrigerator", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "4 Door large capacity commercial refrigerator" },
      { id: 8, name: "4 Door Commercial Freezer", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "4 Door large capacity commercial freezer" },
      { id: 9, name: "4 Door Commercial Chiller", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "4 Door large capacity commercial chiller" },

      // 6 Door variants
      { id: 10, name: "6 Door Commercial Refrigerator", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "6 Door large capacity commercial refrigerator" },
      { id: 11, name: "6 Door Commercial Freezer", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "6 Door large capacity commercial freezer" },
      { id: 12, name: "6 Door Commercial Chiller", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "6 Door large capacity commercial chiller" },

      { id: 13, name: "UnderCounter Deep Freezer", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "Compact UnderCounter deep freezer for commercial kitchens" },
      { id: 14, name: "UnderCounter Chiller", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "Compact UnderCounter chiller for commercial use" },

      { id: 15, name: "UnderCounter Deep Freezer (3 Door)", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "3 Door UnderCounter deep freezer for restaurants and hotels" },
      { id: 16, name: "UnderCounter Chiller (3 Door)", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "3 Door UnderCounter chiller for restaurants and hotels" },

      { id: 17, name: "UnderCounter Deep Freezer (4 Door)", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "4 Door UnderCounter deep freezer for commercial kitchens" },
      { id: 18, name: "UnderCounter Chiller (4 Door)", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "4 Door UnderCounter chiller for commercial kitchens" },

      { id: 19, name: "UnderCounter Deep Freezer (6 Door)", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "6 Door UnderCounter deep freezer for hotels, restaurants, and food businesses" },
      { id: 20, name: "UnderCounter Chiller (6 Door)", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "6 Door UnderCounter chiller for hotels, restaurants, and food businesses" },
      
      { id: 21, name: "Pizza Make Line Refrigerator", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/commercial-refregirator.jpg", description: "Pizza Make Line Refrigerator & Freezer for hotels, restaurants, and food businesses" } 
    ],
    "Bain Marie": [
      { id: 1, name: "Stainless Steel Bain Marie", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/bain-marie.png", description: "Food warming station with temperature control" },
      { id: 2, name: "Countertop Bain Marie", image: "https://example.com/countertop-bain.jpg", description: "Compact bain marie for small spaces" },
    ],
    "Pizza Oven": [
      { id: 1, name: "Commercial Pizza Oven Pro", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/pizza-oven.jpg", description: "High-capacity pizza oven for restaurants" },
      { id: 2, name: "Wood-Fired Pizza Oven", image: "https://example.com/wood-fired-oven.jpg", description: "Authentic wood-fired flavor" },
      { id: 3, name: "Countertop Pizza Oven", image: "https://example.com/countertop-oven.jpg", description: "Compact design for small spaces" },
    ],
    "Waffle Maker Machine": [
      { id: 1, name: "Commercial Waffle Maker", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/waffle-machine.png", description: "Professional waffle maker for high volume" },
      { id: 2, name: "Double Waffle Iron", image: "https://example.com/double-waffle.jpg", description: "Double-sided waffle maker for faster production" },
    ],
    // Add more products as needed
  };

  // Default products if the title isn't found
  const defaultProducts: Product[] = [
    { id: 1, name: "Sample Product 1", image: "https://via.placeholder.com/300", description: "Description of sample product 1" },
    { id: 2, name: "Sample Product 2", image: "https://via.placeholder.com/300", description: "Description of sample product 2" },
    { id: 3, name: "Sample Product 3", image: "https://via.placeholder.com/300", description: "Description of sample product 3" },
  ];

  const products = productTitle ? (productDatabase[productTitle] || defaultProducts) : defaultProducts;

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        
        <h2 className="modal-title">{productTitle} Products</h2>
        
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-detail-card">
              <img src={product.image} alt={product.name} className="product-detail-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button className="inquire-btn">Inquire Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define props for main component
interface ProductContainerProps {
  isResell?: boolean;
}

// Main Product Container Component
const ProductContainer = ({ isResell = false }: ProductContainerProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const manufacturingProducts = [
    { title: "Canteen Kitchen Equipment", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/canteen-kitchen-equipment.webp" },
    { title: "SS Tandoori Bhatti", image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/tandoori-oven.jpg" },
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
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: isMobile,
    centerPadding: isMobile ? "20px" : "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px"
        }
      }
    ]
  };

  const handlePrevClick = () => sliderRef.current?.slickPrev();
  const handleNextClick = () => sliderRef.current?.slickNext();
  
  const handleViewDetails = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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
                <button 
                  className="inquire-btn" 
                  onClick={() => handleViewDetails(product.title)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {/* Navigation - Only show on desktop */}
        {!isMobile && (
          <>
            <button onClick={handlePrevClick} className="nav-btn prev-btn">❮</button>
            <button onClick={handleNextClick} className="nav-btn next-btn">❯</button>
          </>
        )}
      </div>
      
      {/* Product Details Modal */}
      <ProductDetailsModal 
        productTitle={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
        isResell={isResell}
      />
    </div>
  );
};

export default ProductContainer;