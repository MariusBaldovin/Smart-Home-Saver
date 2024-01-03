import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forecast.css";

const Forecast = ({ coordinates, onForecastData }) => {
  const [forecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const groupForecastByDay = (data) => {
    const result = {};
    data.forEach((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString();
      if (!result[day]) {
        result[day] = [];
      }
      result[day].push(item);
    });
    return result;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours()}:00`;
  };

  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      const fetchForecastData = async () => {
        try {
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`;

          const response = await axios.get(url);
          //setForecastData(groupForecastByDay(response.data.list));
          const groupedData = groupForecastByDay(response.data.list);
          setForecastData(groupedData);
          if (onForecastData) {
            onForecastData(groupedData); // Send data back up to the parent
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchForecastData();
    }
  }, [coordinates, onForecastData]);

  if (loading) return <p>Loading forecast data...</p>;
  if (error) return <p>Error loading forecast data: {error}</p>;
  if (!forecastData) return null;

  //Function to add colors to forecast boxes based on temperature for a better user experience

  const getTemperatureColor = (tempCelsius) => {
    if (tempCelsius <= -6) {
      return "#9f80ff"; // Violet Blue for coldest temperatures
    } else if (tempCelsius <= -3) {
      return "#788bff"; // Slightly lighter Violet Blue for cold temperatures
    } else if (tempCelsius <= 0) {
      return "#5194ff"; // Soft Blue for slightly less cold temperatures
    } else if (tempCelsius <= 3) {
      return "#29a3ff"; // Sky Blue for just above freezing
    } else if (tempCelsius <= 6) {
      return "#00b2ff"; // Light Sky Blue for cool temperatures
    } else if (tempCelsius <= 9) {
      return "#00c5f7"; // Cyan for cool to mild temperatures
    } else if (tempCelsius <= 12) {
      return "#00d7df"; // Aquamarine for mild temperatures
    } else if (tempCelsius <= 15) {
      return "#00e9c2"; // Turquoise for comfortable temperatures
    } else if (tempCelsius <= 18) {
      return "#00fca4"; // Medium Spring Green for slightly warm temperatures
    } else if (tempCelsius <= 21) {
      return "#00ff85"; // Mint Green for warm temperatures
    } else if (tempCelsius <= 24) {
      return "#29ff70"; // Lime Green for warmer temperatures
    } else if (tempCelsius <= 27) {
      return "#52ff5b"; // Lime for hot temperatures
    } else {
      return "#7bff46"; // Warm Green for very hot temperatures
    }
  };

  return (
    <div className="forecast-container">
      {Object.entries(forecastData).map(([day, forecasts], index) => (
        <div key={index} className="forecast-day">
          <h3 className="forecast-date">{day}</h3>
          <div className="forecast-details">
            {forecasts.map((item, idx) => (
              <div
                key={idx}
                className="forecast-box"
                style={{ backgroundColor: getTemperatureColor(item.main.temp) }}
              >
                <div className="forecast-time">{formatDate(item.dt)}</div>
                <div className="forecast-temp">
                  {Math.round(item.main.temp)}°C
                </div>
                <div className="forecast-description">
                  {item.weather[0].description}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
