import React from "react";
import "./Devices.css";
import Frame from "../../components/frame/Frame";
import Product from "../../components/product/Product";
import netatmo from "../../assets/netatmo.png";
import nest from "../../assets/nest.png";
import hue_white from "../../assets/hue_white.png";
import hue_colour from "../../assets/hue_colour.png";
import hue_strip from "../../assets/hue_strip.png";
import hue_plug from "../../assets/hue_plug.png";
import tapo_plug from "../../assets/tapo_plug.png";
import hue_motion from "../../assets/hue_motion.png";
import tapo_motion from "../../assets/tapo_motion.png";
import { useCart } from "../../context/CartContext";

const Devices = () => {
  const { addToCart } = useCart();

  const handleButtonClick = (product) => {
    console.log("Adding to cart:", product.title);
    addToCart(product);
  };

  const renderProducts = (category) => {
    return products
      .filter((product) => product.category === category)
      .map((product) => (
        <Product
          key={product.id}
          title={product.title}
          imageUrl={product.imageUrl}
          price={product.price} // Pass the price to the Product component
          buttonText="Add to cart"
          onButtonClick={() => handleButtonClick(product)}
        />
      ));
  };

  const products = [
    {
      id: "netatmo-thermostat",
      title: "Netatmo Thermostat",
      imageUrl: netatmo,
      category: "Smart Thermostat",
      price: 199.99, // Add a price to this product
    },
    {
      id: "nest-thermostat",
      title: "Nest Thermostat",
      imageUrl: nest,
      category: "Smart Thermostat",
      price: 189.99, // Add a price to this product
    },
    {
      id: "philips-hue-white",
      title: "Philips Hue White",
      imageUrl: hue_white,
      category: "Smart Lights",
      price: 29.99, // Add a price to this product
    },
    {
      id: "philips-hue-colour",
      title: "Philips Hue Colour",
      imageUrl: hue_colour,
      category: "Smart Lights",
      price: 49.99, // Add a price to this product
    },
    {
      id: "philips-hue-strip",
      title: "Philips Hue Strip",
      imageUrl: hue_strip,
      category: "Smart Lights",
      price: 59.99, // Add a price to this product
    },
    {
      id: "philips-hue-plug",
      title: "Philips Plug",
      imageUrl: hue_plug,
      category: "Smart Plugs",
      price: 24.99, // Add a price to this product
    },
    {
      id: "tp-link-tapo",
      title: "Tp Link Tapo",
      imageUrl: tapo_plug,
      category: "Smart Plugs",
      price: 19.99, // Add a price to this product
    },
    {
      id: "hue-motion-sensor",
      title: "Hue Motion Sensor",
      imageUrl: hue_motion,
      category: "Smart Sensors",
      price: 39.99, // Add a price to this product
    },
    {
      id: "tapo-motion-sensor",
      title: "Tapo Motion Sensor",
      imageUrl: tapo_motion,
      category: "Smart Sensors",
      price: 29.99, // Add a price to this product
    },
  ];

  return (
    <div className="devices-container">
      <Frame id="frame1" title="Smart Thermostat">
        <div className="products-container">
          {renderProducts("Smart Thermostat")}
        </div>
      </Frame>
      <Frame id="frame2" title="Smart Lights">
        <div className="products-container">
          {renderProducts("Smart Lights")}
        </div>
      </Frame>
      <Frame id="frame3" title="Smart Plugs">
        <div className="products-container">
          {renderProducts("Smart Plugs")}
        </div>
      </Frame>
      <Frame id="frame4" title="Smart Sensors">
        <div className="products-container">
          {renderProducts("Smart Sensors")}
        </div>
      </Frame>
    </div>
  );
};

export default Devices;
