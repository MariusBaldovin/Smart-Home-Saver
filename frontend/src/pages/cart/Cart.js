import React from "react";
import { useCart } from "../../context/CartContext";
import "./cart.css";
import { SlTrash } from "react-icons/sl";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Cart = () => {
  const { cart, adjustQuantity, removeFromCart } = useCart();

  const handleMinusClick = (id) => {
    // Decrease the quantity of the item in the cart
    adjustQuantity(id, -1);
  };

  const handlePlusClick = (id) => {
    // Increase the quantity of the item in the cart
    adjustQuantity(id, 1);
  };

  const handleRemoveClick = (id) => {
    // Remove the item from the cart
    removeFromCart(id);
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      return (
        <div className="empty-cart-text-container">
          <p className="empty-cart-text">Your cart is empty.</p>
        </div>
      );
    }

    return (
      <div className="cart-items-container">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <div className="cart-details-values-container">
                <div className="cart-details-container">
                  <p>Quantity:</p>
                  <p>Unit Price:</p>
                  <p>Sub-Total:</p>
                </div>
                <div className="cart-detail-values">
                  <div className="quantity-adjusting-container">
                    <CiCircleMinus
                      className="plus-minus-style"
                      onClick={() => handleMinusClick(item.id)}
                    />
                    <p>{item.quantity}</p>
                    <CiCirclePlus
                      className="plus-minus-style"
                      onClick={() => handlePlusClick(item.id)}
                    />
                  </div>
                  <p>£ {item.price.toFixed(2)}</p>
                  <p>£ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="remove-item-container">
                  <button
                    className="remove-item-button"
                    onClick={() => handleRemoveClick(item.id)}>
                    <SlTrash className="remove-icon" />
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCartSummary = () => {
    if (cart.length === 0) {
      return null; // Don't render summary if cart is empty
    }

    const total = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    return (
      <div className="cart-summary">
        <h3>Summary</h3>
        <ul>
          <li className="summary-titles">
            <p>Item</p>
            <p>Unit Price</p>
            <p>Sub Total</p>
          </li>
          {cart.map((item) => (
            <li key={item.id}>
              <p>
                {item.title} x{item.quantity}:
              </p>
              <p>£ {item.price.toFixed(2)}</p>
              <p>£ {(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="total-divider"></div>
        <div className="total-price-container">
          <p>Total:</p>
          <p>£ {total.toFixed(2)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-layout">
        {renderCartItems()}
        {renderCartSummary()}
      </div>
    </div>
  );
};

export default Cart;
