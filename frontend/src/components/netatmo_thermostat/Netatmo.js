import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Netatmo.css";

const Netatmo = () => {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store homes data fetched from the API
  const [, setHomes] = useState([]);

  // State to store the ID of the selected home
  const [selectedHomeId, setSelectedHomeId] = useState("");

  // State to store temperature data
  const [temperature, setTemperature] = useState("");

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to store any errors
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    console.log("Checking authentication status...");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/checkAuth`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Authentication check successful:", response);
        setIsAuthenticated(true);
        fetchHomes();
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
          setIsLoading(false);
        } else {
          setError(error);
        }
      });
  }, []);

  // Function to fetch homes data
  const fetchHomes = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/homes`, {
        withCredentials: true,
      })
      .then((response) => {
        setHomes(response.data);
        setIsLoading(false);
        if (response.data.length > 0) {
          setSelectedHomeId(response.data[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching homes:", error);
        setError(error);
        setIsLoading(false);
      });
  };

  // Function to fetch temperature data
  const fetchTemperature = (homeId) => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/temperature/${homeId}`, {
        withCredentials: true,
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

  // useEffect hook to fetch temperature data when selectedHomeId changes
  useEffect(() => {
    if (selectedHomeId) {
      fetchTemperature(selectedHomeId);
    }
  }, [selectedHomeId]);

  /* // Function to handle home selection change
  const handleHomeSelection = (e) => {
    setSelectedHomeId(e.target.value);
  }; */

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, {
          withCredentials: true,
        })
        .then(() => {
          setIsAuthenticated(false);
          navigate("/MyAccount");
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    } else {
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/netatmo`;
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
