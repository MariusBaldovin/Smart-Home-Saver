import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

const Weather = ({ coordinates }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      const fetchWeatherData = async () => {
        try {
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`;

          const response = await axios.get(url);
          setWeatherData(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchWeatherData();
    }
  }, [coordinates]);

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error loading weather data: {error}</p>;
  if (!weatherData) return null;

  return (
    <div className="card weather-card text-center mt-3">
      <div className="card-body">
        <h5 className="card-title weather-title">
          Temperature: {weatherData.main.temp}°C
        </h5>
        <p className="card-text weather-text">
          Feels Like: {weatherData.main.feels_like}°C
        </p>
        <p className="card-text weather-text">
          Weather: {weatherData.weather[0].main} (
          {weatherData.weather[0].description})
        </p>
        <p className="card-text weather-text">
          Humidity: {weatherData.main.humidity}%
        </p>
        <p className="card-text weather-text">
          Pressure: {weatherData.main.pressure} hPa
        </p>
        <p className="card-text weather-text">
          Wind Speed: {weatherData.wind.speed} m/s
        </p>
        <p className="card-text weather-text">
          Cloudiness: {weatherData.clouds.all}%
        </p>
        <p className="card-text weather-text">
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p className="card-text weather-text">
          Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default Weather;
