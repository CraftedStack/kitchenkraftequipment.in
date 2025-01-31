import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HowWeWork.css';
import { convertImagesToFormat } from "./imageUtils";

const HowWeWork = () => {
  const [cards, setCards] = useState([
    {
      title: "Identify the problem",
      description: "We start by analyzing the problem and gathering requirements.",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/kitchen.jpg",
    },
    {
      title: "Design a solution",
      description: "Next, we design a custom solution that addresses the issue at hand.",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/th.jpeg",
    },
    {
      title: "Execute and deliver",
      description: "We implement the solution and deliver the final product to the client.",
      image: "https://s3.ap-south-1.amazonaws.com/kitchenkraftequipement.in/imgs/153084695.webp",
    },
  ]);

  useEffect(() => {
    const formatImages = async () => {
      const updatedCards = await convertImagesToFormat(cards, "image/png");
      setCards(updatedCards);
    };
    formatImages();
  }, []);

  return (
    <section className="how-we-work container my-4" id='services'>
      <h2>How We Work</h2>
      <h3 className="work-description">
        Our streamlined preproduction process ensures the highest quality materials,
        meeting both market demands and regulatory standards with precision and efficiency.
      </h3>

      <div className="row">
        {cards.map((card, index) => (
          <div className="col-12 col-md-4 mb-3" key={index}>
            <div className="card1">
              <div className="header">
                <div className="image">
                  <img src={card.image} alt={card.title} />
                </div>
              </div>
              <div className="info">
                <span className="title">{card.title}</span>
                <p className="description">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;
