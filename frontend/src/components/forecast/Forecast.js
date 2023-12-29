// Forecast.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Forecast.css";

const Forecast = ({ coordinates }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.getHours()}:${
      date.getMinutes() < 10 ? "0" : ""
    }${date.getMinutes()}`;
  };

  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      const fetchForecastData = async () => {
        try {
          const apiKey = process.env.WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`;

          const response = await axios.get(url);
          setForecastData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchForecastData();
    }
  }, [coordinates]);

  if (loading) return <p>Loading forecast data...</p>;
  if (error) return <p>Error loading forecast data: {error}</p>;
  if (!forecastData) return null;

  return (
    <div className="forecast-grid">
      {forecastData.list.map((item, index) => (
        <div key={index} className="forecast-box">
          <div className="forecast-date">{formatDate(item.dt)}</div>
          <div className="forecast-temp">{item.main.temp}°C</div>
          <div className="forecast-description">
            {item.weather[0].description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
