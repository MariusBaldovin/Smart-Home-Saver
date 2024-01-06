import React from "react";
import "./MyAccount.css";
import Frame from "../../components/frame/Frame";
import PhilipsHue from "../../components/philips_hue/PhilipsHue";
import Netatmo from "../../components/netatmo_thermostat/Netatmo";

const MyAccount = () => {
  return (
    <div className="my-account-container">
      <Frame id="frame1" title="Frame 1">
        <Netatmo />
      </Frame>
      <Frame id="frame2" title="Frame 2">
        <PhilipsHue />
      </Frame>
    </div>
  );
};

export default MyAccount;
