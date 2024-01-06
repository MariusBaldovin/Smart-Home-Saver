import React from "react";
import "./Product.css";

const Product = ({ title, imageUrl, price, buttonText, onButtonClick }) => {
  return (
    <div className="image-product">
      <h3 className="image-product-title">{title}</h3>
      <img src={imageUrl} alt={title} className="image-product-img" />
      <p className="image-product-price">£{price.toFixed(2)}</p>
      <button className="image-product-btn" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Product;
