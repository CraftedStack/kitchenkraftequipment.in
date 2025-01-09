// Card.js
import React from 'react';
import './Products.css';

const Card = ({ imageUrl, title, category, author, date }) => {
  return (
    <div className="card shadow">
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="category">{category}</div>
      <div className="card-info">
        <p className="title">{title}</p>
        <div className="author">
          <span className="name">{author}</span> {date}
        </div>
      </div>
    </div>
  );
};

export default Card;
