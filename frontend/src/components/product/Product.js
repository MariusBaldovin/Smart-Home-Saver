import React from "react";
import "./Product.css";

const Product = ({ title, imageUrl, buttonText, onButtonClick }) => {
  return (
    <div className="image-product">
      <h3 className="image-product-title">{title}</h3>
      <img src={imageUrl} alt={title} className="image-product-img" />
      <button className="image-product-btn" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Product;
