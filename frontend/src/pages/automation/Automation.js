import { React, useState } from "react";
import "./Automation.css";
import Frame from "../../components/frame/Frame";
import Location from "../../components/location/Location";
import Weather from "../../components/weather/Weather";
import Forecast from "../../components/forecast/Forecast";
import Netatmo from "../../components/netatmo_thermostat/Netatmo";
import ThermostatSchedule from "../../components/thermostat_schedule/ThermostatSchedule";

const Automation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  return (
    <div className="my-account-container">
      <Frame id="frame1" title="">
        <div className="weather-frame">
          <div className="location">
            <Location onCoordinates={setCoordinates} />
          </div>
          <div className="weather">
            {coordinates && <Weather coordinates={coordinates} />}
          </div>
        </div>
      </Frame>
      <Frame id="frame2" title="Thermostat Control Panel">
        <Netatmo />
      </Frame>
      <Frame id="frame3" title="Forecast">
        <>
          {coordinates && (
            <Forecast
              coordinates={coordinates}
              onForecastData={setForecastData}
            />
          )}
        </>
      </Frame>
      <Frame id="frame4" title="Recommended Thermostat Temperature">
        {forecastData && <ThermostatSchedule forecastData={forecastData} />}
      </Frame>
    </div>
  );
};

export default Automation;
