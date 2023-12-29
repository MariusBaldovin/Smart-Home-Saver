import React from "react";
import "./Devices.css";
import Frame from "../../components/frame/Frame";

const Devices = () => {
  return (
    <div className="my-account-container">
      <Frame id="frame1" title="Smart Thermostat">
        <p>Content for frame 1...</p>
      </Frame>
      <Frame id="frame2" title="Smart Lights">
        <p>Content for frame 2...</p>
      </Frame>
      <Frame id="frame3" title="Smart Plugs">
        <p>Content for frame3...</p>
      </Frame>
      <Frame id="frame4" title="Smart Sensors">
        <p>Content for frame 4...</p>
      </Frame>
    </div>
  );
};

export default Devices;
