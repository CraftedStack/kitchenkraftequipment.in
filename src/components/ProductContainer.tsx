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
  price?: string;
  genre_id?: number;
  genre_name?: string;
}

interface Genre {
  id: number;
  name: string;
  description: string;
  image: string;
  type: string;
}

interface ProductDetailsModalProps {
  genreId: number | null;
  genreTitle: string | null;
  isOpen: boolean;
  onClose: () => void;
  isResell?: boolean;
}

// Product Details Modal Component
const ProductDetailsModal = ({ genreId, genreTitle, isOpen, onClose, isResell }: ProductDetailsModalProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && genreId) {
      fetchProductsByGenre(genreId);
    }
  }, [isOpen, genreId]);

  const fetchProductsByGenre = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/products/genre/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced product description with SEO keywords
  const enhanceProductDescription = (product: Product) => {
    const baseDescription = product.description || `Professional ${product.name.toLowerCase()} for commercial kitchens`;
    const seoKeywords = isResell 
      ? `Premium quality ${product.name.toLowerCase()} from trusted brands. Ideal for restaurants, hotels, and commercial kitchens in Pune.`
      : `Custom manufactured ${product.name.toLowerCase()} made with high-grade stainless steel. Built for durability and efficiency in commercial food service operations.`;
    
    return `${baseDescription}. ${seoKeywords}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        
        <h2 className="modal-title">
          {genreTitle} - {isResell ? 'Premium Brand Products' : 'Custom Manufactured Equipment'}
        </h2>
        
        <div className="category-description mb-4">
          <p className="text-gray-600">
            {isResell 
              ? `Explore our curated selection of premium ${genreTitle?.toLowerCase()} from trusted manufacturers. Perfect for restaurants, hotels, and commercial kitchens requiring reliable, high-performance equipment.`
              : `Custom-manufactured ${genreTitle?.toLowerCase()} built with precision engineering and premium stainless steel materials. Designed specifically for commercial food service operations in Pune and across Maharashtra.`
            }
          </p>
        </div>
        
        {loading && (
          <div className="loading-state">
            <p>Loading products...</p>
          </div>
        )}
        
        {error && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}
        
        {!loading && !error && products.length === 0 && (
          <div className="empty-state">
            <p>No products available in this category. Contact us for custom solutions.</p>
          </div>
        )}
        
        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-detail-card">
                <img 
                  src={product.image || 'https://via.placeholder.com/300'} 
                  alt={`${product.name} - Commercial Kitchen Equipment in Pune`}
                  className="product-detail-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300?text=No+Image';
                  }}
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                  {enhanceProductDescription(product)}
                </p>
                {product.price && <p className="product-price">₹{product.price}</p>}
                
                <div className="product-features">
                  <h4 className="features-title">Key Features:</h4>
                  <ul className="features-list">
                    {isResell ? (
                      <>
                        <li>✓ Premium brand quality</li>
                        <li>✓ Ready for immediate delivery</li>
                        <li>✓ Warranty and support included</li>
                        <li>✓ Tested and certified</li>
                      </>
                    ) : (
                      <>
                        <li>✓ Custom manufactured to specifications</li>
                        <li>✓ High-grade stainless steel (SS 304/316)</li>
                        <li>✓ Food safety compliant</li>
                        <li>✓ Built for commercial use</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <button className="inquire-btn">
                  Get Quote for {product.name}
                </button>
              </div>
            ))}
          </div>
        )}
        
        <div className="modal-footer">
          <p className="contact-info">
            Need custom solutions or have questions? 
            <strong> Contact Kitchen Kraft Equipments</strong> for expert consultation and competitive pricing.
          </p>
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
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedGenreTitle, setSelectedGenreTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch genres on component mount
  useEffect(() => {
    fetchGenres();
  }, [isResell]);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchGenres = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/genres`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
      
      const data = await response.json();
      
      // Filter genres based on type
      const filteredGenres = Array.isArray(data) 
        ? data.filter(genre => genre.type === (isResell ? 'resell' : 'manufacture'))
        : [];
      
      setGenres(filteredGenres);
    } catch (err) {
      console.error('Error fetching genres:', err);
      setError('Failed to load products. Please try again later.');
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: genres.length > 1,
    speed: 500,
    slidesToShow: isMobile ? 1 : Math.min(3, genres.length),
    slidesToScroll: 1,
    autoplay: genres.length > 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, genres.length),
          centerMode: false,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px"
        }
      }
    ]
  };

  const handlePrevClick = () => sliderRef.current?.slickPrev();
  const handleNextClick = () => sliderRef.current?.slickNext();
  
  const handleViewDetails = (genreId: number, genreTitle: string) => {
    setSelectedGenreId(genreId);
    setSelectedGenreTitle(genreTitle);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGenreId(null);
    setSelectedGenreTitle(null);
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
    <div className={`product-slider-container ${isResell ? "resell" : ""}`} id="Products">
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
      <div className="section-header">
        <h2 className="section-title">
          {isResell ? "PREMIUM BRAND PRODUCTS" : "CUSTOM MANUFACTURED EQUIPMENT"}
        </h2>
        <p className="section-description">
          {isResell 
            ? "Discover our curated selection of premium commercial kitchen equipment from trusted brands. Ready-to-ship solutions for restaurants, hotels, and food service businesses across Pune and Maharashtra."
            : "Precision-engineered stainless steel kitchen equipment manufactured to your exact specifications. Custom solutions built with premium SS 304/316 materials for commercial food service operations."
          }
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <p>Loading products...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <p>{error}</p>
          <button onClick={fetchGenres} className="retry-btn">Retry</button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && genres.length === 0 && (
        <div className="empty-container">
          <p>No products available at the moment.</p>
        </div>
      )}

      {/* Product Slider */}
      {!loading && !error && genres.length > 0 && (
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {genres.map((genre) => (
              <div key={genre.id} className="px-2">
                <div className="product-card">
                  <img 
                    src={genre.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={`${genre.name} - Commercial Kitchen Equipment in Pune`}
                    className="product-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  <div className="product-info">
                    <h3 className="product-title">{genre.name}</h3>
                    <p className="product-category-description">
                      {isResell 
                        ? `Premium ${genre.name.toLowerCase()} from trusted brands for professional kitchens`
                        : `Custom manufactured ${genre.name.toLowerCase()} with high-grade stainless steel`
                      }
                    </p>
                    <div className="product-highlights">
                      {isResell ? (
                        <span className="highlight-badge">Ready to Ship</span>
                      ) : (
                        <span className="highlight-badge">Custom Made</span>
                      )}
                    </div>
                  </div>
                  <button 
                    className="inquire-btn" 
                    onClick={() => handleViewDetails(genre.id, genre.name)}
                  >
                    View {genre.name} Products
                  </button>
                </div>
              </div>
            ))}
          </Slider>

          {/* Navigation - Only show on desktop and when there are enough items */}
          {!isMobile && genres.length > 3 && (
            <>
              <button onClick={handlePrevClick} className="nav-btn prev-btn">❮</button>
              <button onClick={handleNextClick} className="nav-btn next-btn">❯</button>
            </>
          )}
        </div>
      )}
      
      {/* Product Details Modal */}
      <ProductDetailsModal 
        genreId={selectedGenreId}
        genreTitle={selectedGenreTitle}
        isOpen={isModalOpen}
        onClose={closeModal}
        isResell={isResell}
      />
    </div>
  );
};

export default ProductContainer;