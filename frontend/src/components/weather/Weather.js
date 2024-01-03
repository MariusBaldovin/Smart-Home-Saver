import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import clear_sun_icon from "../../assets/weather/clear_sun.png";
import clear_moon_icon from "../../assets/weather/clear_moon.png";
import few_clouds_day_icon from "../../assets/weather/few_clouds_day.png";
import few_clouds_night_icon from "../../assets/weather/few_clouds_day.png";
import cloud_icon from "../../assets/weather/cloud.png";
import day_shower_rain_icon from "../../assets/weather/day_shower_rain.png";
import night_shower_rain_icon from "../../assets/weather/night_shower_rain.png";
import rain_icon from "../../assets/weather/rain.png";
import day_thunderstorm_icon from "../../assets/weather/day_thunderstorm.png";
import night_thunderstorm_icon from "../../assets/weather/night_thunderstorm.png";
import snow_icon from "../../assets/weather/snow.png";
import mist_icon from "../../assets/weather/mist.png";
import wind_icon from "../../assets/weather/wind.png";
import humidity_icon from "../../assets/weather/humidity.png";

const Weather = ({ coordinates }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wicon, setWicon] = useState();

  useEffect(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      const fetchWeatherData = async () => {
        try {
          const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`;

          const response = await axios.get(url);
          setWeatherData(response.data);
          // icons based in the weather retrieved from OpenWeatherMap
          const iconCode = response.data.weather[0].icon;
          switch (iconCode) {
            case "01d":
              setWicon(clear_sun_icon);
              break;
            case "01n":
              setWicon(clear_moon_icon);
              break;
            case "02d":
              setWicon(few_clouds_day_icon);
              break;
            case "02n":
              setWicon(few_clouds_night_icon);
              break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              setWicon(cloud_icon);
              break;
            case "09d":
              setWicon(day_shower_rain_icon);
              break;
            case "09n":
              setWicon(night_shower_rain_icon);
              break;
            case "10d":
            case "10n":
              setWicon(rain_icon);
              break;
            case "11d":
              setWicon(day_thunderstorm_icon);
              break;
            case "11n":
              setWicon(night_thunderstorm_icon);
              break;
            case "13d":
            case "13n":
              setWicon(snow_icon);
              break;
            case "50d":
            case "50n":
              setWicon(mist_icon);
              break;

            default:
              setWicon();
          }
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
    <div className="weather-container">
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temperature">{weatherData.main.temp}°C</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.main.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.wind.speed} m/s</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

/*    <div className="card-body">
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
        
      </div>*/
