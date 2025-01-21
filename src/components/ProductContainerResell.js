import React, { useRef,useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./ProductContainer.css"; 

import { convertImagesToFormat } from "./imageUtils";

function ProductContainer() {
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([
    { title: "Waffle Maker Machine", image: "tandoori-oven.jpg" },
    {
      title: "Sandwich Grillers",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/th.jpeg",
    },
    { title: "Pizza Oven", image: "bain-marie.jpg" },
    { title: "Deep Fryer's", image: "display-counter.jpg" },
    { title: "Griddle Plate", image: "kitchen-trolley.png" },
    { title: "Stainless Steel Table", image: "kitchen-trolley.png" },
    { title: "Burner Cooking Range", image: "kitchen-trolley.png" },
  ]);

  useEffect(() => {
    const formatImages = async () => {
      const updatedProducts = await convertImagesToFormat(products, "image/png");
      console.log("Updated Products:", updatedProducts); // Log updated products
      setProducts(updatedProducts);
    };
    formatImages();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const handlePrevClick = () => sliderRef.current?.slickPrev();
  const handleNextClick = () => sliderRef.current?.slickNext();

  return (
    <div className="product-slider-container container mt-5" id="ProductContainer">
      <div class="info-marquee">
  <marquee behavior="scroll" direction="left">
    <span class="info-text">
      For more information about our Best sellers, please contact us directly.
    </span>
    <span class="info-text-hindi">
      उत्पादों के बारे में अधिक जानकारी के लिए, कृपया सीधे हमसे संपर्क करें।
    </span>
    <span class="info-text-marathi">
      आमच्या उत्पादनांविषयी अधिक माहितीसाठी कृपया थेट आमच्याशी संपर्क साधा.
    </span>
  </marquee>
</div>
      <h2>OUR BEST SELLERS</h2>
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            <img src={product.image} alt={product.title} className="img-fluid product-image" />
            <h3 className="product-title">{product.title}</h3>
          </div>
        ))}
      </Slider>
      <div className="btn-container">
        <button className="prev-btn" onClick={handlePrevClick}>❮</button>
        <button className="next-btn" onClick={handleNextClick}>❯</button>
      </div>
    </div>
  );
}

export default ProductContainer;
