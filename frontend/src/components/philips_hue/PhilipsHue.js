import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PhilipsHue.css";

const PhilipsHue = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lights, setLights] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      sessionStorage.setItem("hue_token", token);
      setIsAuthenticated(true);
      createUserAndFetchLights(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const createUserAndFetchLights = async (token) => {
    try {
      // Create user
      const userResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/createUser`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("User created:", userResponse.data);
      const username = userResponse.data[0].success.username; // Extract username
      console.log("username is:", username);

      // Fetch lights with the new username
      const lightsResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/lights?username=${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLights(lightsResponse.data);
    } catch (error) {
      console.error("Error: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHueLoginLogout = () => {
    if (isAuthenticated) {
      sessionStorage.removeItem("hue_token");
      setIsAuthenticated(false);
    } else {
      window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/philips`;
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="hue-container">
      <button onClick={handleHueLoginLogout} className="login-logout-button">
        {isAuthenticated ? "Logout" : "Login with Philips Hue"}
      </button>
      <div className="hue-lights">
        {lights &&
          Object.entries(lights).map(([id, light]) => (
            <div key={id}>
              <h3>{light.name}</h3>
              <p>Status: {light.state.on ? "On" : "Off"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhilipsHue;
