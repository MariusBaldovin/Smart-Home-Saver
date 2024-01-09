import React from "react";
import "./MyAccount.css";
import Frame from "../../components/frame/Frame";
import PhilipsHue from "../../components/philips_hue/PhilipsHue";
import Netatmo from "../../components/netatmo_thermostat/Netatmo";
import RequireAuth from "../../utils/RequireAuth";

const MyAccount = () => {
  return (
    <div className="my-account-container">
      <Frame id="frame1" title="MY THERMOSTAT">
        <RequireAuth>
          <Netatmo />
        </RequireAuth>
      </Frame>
      <Frame id="frame2" title="MY LIGHTS">
        <RequireAuth>
          <PhilipsHue />
        </RequireAuth>
      </Frame>
    </div>
  );
};

export default MyAccount;
