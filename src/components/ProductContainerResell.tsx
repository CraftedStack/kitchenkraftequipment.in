"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductContainerResell = () => {
  const sliderRef = useRef<Slider | null>(null);

  const [products] = useState([
    {
      title: "Waffle Maker Machine",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/waffle-machine.png",
    },
    {
      title: "Sandwich Grillers",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/sandwich-maker.jpg",
    },
    {
      title: "Pizza Oven",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/pizza-oven.jpg",
    },
    {
      title: "Deep Fryer's",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/EDeep-fryer.jpg",
    },
    {
      title: "Griddle Plate",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/griddle-plate.jpg",
    },
    {
      title: "Stainless Steel Table",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/stainless-steel-table.jpg",
    },
    {
      title: "Burner Cooking Range",
      image:
        "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/burning-cooking-range.webp",
    },
  ]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const handlePrevClick = () => sliderRef.current?.slickPrev();
  const handleNextClick = () => sliderRef.current?.slickNext();

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-gray-50 rounded-xl shadow-md">
      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-blue-900 bg-gray-100">
        <div className="flex animate-marquee whitespace-nowrap py-2 font-bold text-gray-700 text-center">
          <span className="mx-10">
            For more information about our Best Sellers, please contact us
            directly.
          </span>
          <span className="mx-10">
            उत्पादों के बारे में अधिक जानकारी के लिए, कृपया सीधे हमसे संपर्क करें।
          </span>
          <span className="mx-10">
            आमच्या उत्पादनांविषयी अधिक माहितीसाठी कृपया थेट आमच्याशी संपर्क साधा.
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-blue-900 text-center my-6">
        OUR BEST SELLERS
      </h2>

      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition p-3 h-[350px]"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              {product.title}
            </h3>
          </div>
        ))}
      </Slider>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrevClick}
          className="w-10 h-10 rounded-full bg-gray-600 text-white text-xl flex items-center justify-center hover:bg-blue-900 transform hover:scale-110 transition"
        >
          ❮
        </button>
        <button
          onClick={handleNextClick}
          className="w-10 h-10 rounded-full bg-gray-600 text-white text-xl flex items-center justify-center hover:bg-blue-900 transform hover:scale-110 transition"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ProductContainerResell;
