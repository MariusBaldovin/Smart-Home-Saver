import { React, useState } from "react";
import "./Automation.css";
import Frame from "../../components/frame/Frame";
import Location from "../../components/location/Location";
import Weather from "../../components/weather/Weather";
import Forecast from "../../components/forecast/Forecast";
import Netatmo from "../../components/netatmo_thermostat/Netatmo";
import ThermostatSchedule from "../../components/thermostat_schedule/ThermostatSchedule";
import PhilipsHue from "../../components/philips_hue/PhilipsHue";

const Automation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const getFirstAndLastDates = (data) => {
    const dates = Object.keys(data || {}).sort();
    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    return { firstDate, lastDate };
  };
  const { firstDate, lastDate } = getFirstAndLastDates(forecastData);
  return (
    <div className="automation-container">
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
      <Frame id="frame3" title={`Forecast for ${firstDate} - ${lastDate}`}>
        <>
          {coordinates && (
            <Forecast
              coordinates={coordinates}
              onForecastData={setForecastData}
            />
          )}
        </>
      </Frame>
      <Frame
        id="frame4"
        title={`Create your Thermostat Schedule for ${firstDate} - ${lastDate}`}
      >
        {forecastData && <ThermostatSchedule forecastData={forecastData} />}
      </Frame>
      <Frame id="frame4" title="philipshue">
        <PhilipsHue />
      </Frame>
    </div>
  );
};

export default Automation;
