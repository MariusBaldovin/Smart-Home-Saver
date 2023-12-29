import { React, useState } from "react";
import "./Automation.css";
import Frame from "../../components/frame/Frame";
import Location from "../../components/location/Location";
import Weather from "../../components/weather/Weather";
import Forecast from "../../components/forecast/Forecast";
import Netatmo from "../../components/netatmo_thermostat/Netatmo";

const Automation = () => {
  const [coordinates, setCoordinates] = useState(null);
  return (
    <div className="my-account-container">
      <Frame id="frame1" title="My Location">
        <>
          <Location onCoordinates={setCoordinates} />
        </>
      </Frame>
      <Frame id="frame2" title="Weather">
        <>{coordinates && <Weather coordinates={coordinates} />}</>
      </Frame>
      <Frame id="frame3" title="Forecast">
        <>{coordinates && <Forecast coordinates={coordinates} />}</>
      </Frame>
      <Frame id="frame4" title="Thermostat Control Panel">
        <Netatmo />
      </Frame>
      <Frame id="frame5" title="Frame 5">
        <>Content for frame 5...</>
      </Frame>
      <Frame id="frame6" title="Frame 6">
        <>Content for frame 6...</>
      </Frame>
    </div>
  );
};

export default Automation;
