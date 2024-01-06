import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Netatmo.css";

const Netatmo = () => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store homes data fetched from the API
  const [homes, setHomes] = useState([]);

  // State to store the ID of the selected home
  const [selectedHomeId, setSelectedHomeId] = useState("");

  // State to store temperature data
  const [temperature, setTemperature] = useState("");

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to store any errors
  const [error, setError] = useState(null);

  // useEffect hook to handle authentication and token retrieval
  useEffect(() => {
    const storedToken = sessionStorage.getItem("netatmo_token");
    if (storedToken) {
      setIsAuthenticated(true);
      fetchHomes(storedToken);
    } else {
      // Extracting token from URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        sessionStorage.setItem("netatmo_token", token);
        setIsAuthenticated(true);
        fetchHomes(token);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  // Function to fetch homes data
  const fetchHomes = (token) => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/api/homes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setHomes(response.data);
        setIsLoading(false);
        if (response.data.length > 0) {
          setSelectedHomeId(response.data[0].id);
          console.log("HOME ID IS:", response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching homes:", error);
        setError(error);
        setIsLoading(false);
      });
  };

  // useEffect hook to fetch temperature data when selectedHomeId changes
  useEffect(() => {
    if (selectedHomeId) {
      const token = sessionStorage.getItem("netatmo_token");
      fetchTemperature(token, selectedHomeId);
    }
  }, [selectedHomeId]);

  // Function to fetch temperature data
  const fetchTemperature = (token, homeId) => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/api/temperature/${homeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTemperature(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching temperature:", error);
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (selectedHomeId) {
      const token = sessionStorage.getItem("netatmo_token");
      fetchTemperature(token, selectedHomeId);
    }
  }, [selectedHomeId]);

  // Function to handle home selection change
  const handleHomeSelection = (e) => {
    setSelectedHomeId(e.target.value);
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      sessionStorage.removeItem("netatmo_token");
      setIsAuthenticated(false);
    } else {
      window.location.href = "http://localhost:3001/auth/netatmo";
    }
  };

  if (isLoading) {
    // If data is still loading, show loading message
    return <p>Loading...</p>;
  }

  if (error) {
    // If there is an error, display it
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="netatmo-container">
      {isAuthenticated && (
        <>
          {temperature && (
            <div>
              <p>
                Actual Temperature: {temperature[0].therm_measured_temperature}
                °C
              </p>
              <p>
                Desired Temperature :{" "}
                {temperature[0].therm_setpoint_temperature}°C
              </p>
              <p>
                Boiler Status:{" "}
                {temperature[0].heating_power_request ? "On" : "Off"}
              </p>
              <p>
                Any windows open?: {temperature[0].open_window ? "Yes" : "No"}
              </p>
              <p>Battery State: {temperature[0].battery_state}</p>
            </div>
          )}
        </>
      )}

      <button onClick={handleLoginLogout} className="login-logout-button">
        {isAuthenticated ? "Logout with Netatmo" : "Login with Netatmo"}
      </button>
    </div>
  );
};

export default Netatmo;
