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

const Devices = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
    // Handle the button click event
  };
  return (
    <div className="devices-container">
      <Frame id="frame1" title="Smart Thermostat">
        <div className="products-container">
          <Product
            title="Netatmo Thermostat"
            imageUrl={netatmo}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
          <Product
            title="Nest Thermostat"
            imageUrl={nest}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
        </div>
      </Frame>
      <Frame id="frame2" title="Smart Lights">
        <div className="products-container">
          <Product
            title="Philips Hue White"
            imageUrl={hue_white}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
          <Product
            title="Philips Hue Colour"
            imageUrl={hue_colour}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
          <Product
            title="Philips Hue Colour"
            imageUrl={hue_strip}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
        </div>
      </Frame>
      <Frame id="frame3" title="Smart Plugs">
        <div className="products-container">
          <Product
            title="Philips Plug"
            imageUrl={hue_plug}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
          <Product
            title="Tp Link Tapo"
            imageUrl={tapo_plug}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
        </div>
      </Frame>
      <Frame id="frame4" title="Smart Sensors">
        <div className="products-container">
          <Product
            title="Hue Motion Sensor"
            imageUrl={hue_motion}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
          <Product
            title="Tapo Motion Sensor"
            imageUrl={tapo_motion}
            buttonText="Add to cart"
            onButtonClick={handleButtonClick}
          />
        </div>
      </Frame>
    </div>
  );
};

export default Devices;
