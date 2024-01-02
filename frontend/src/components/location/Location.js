import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Location.css";

const Location = ({ onCoordinates }) => {
  // State to store location data
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    address: null,
  });

  // state variable to track manual location input submission
  const [formSubmitted, setFormSubmitted] = useState(false);

  //state for manual input in case location can't be retrieved. defauls is false
  const [manualEntry, setManualEntry] = useState(false);

  // Function called when location is successfully retrieved
  const onSuccess = async (location) => {
    const { latitude, longitude } = location.coords;
    // Update parent component's state with new coordinates
    onCoordinates({ lat: latitude, lng: longitude });

    // Fetch address based on latitude and longitude
    const address = await fetchAddress(latitude, longitude);

    // Update state with loaded status, coordinates, and address
    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      address,
    });
  };

  // Function called when there is an error in retrieving location
  const onError = (error) => {
    console.error("Error fetching location:", error);
    setLocation({
      loaded: true,
      error,
    });
    setManualEntry(true);
    console.log("Manual entry enabled");
  };

  // useEffect to get the current position of the user
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  // Function to fetch address using OpenStreetMap API

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            format: "json",
            lat: lat,
            lon: lng,
          },
        }
      );
      const address = response.data.address;
      const detailedAddress =
        address.town ||
        address.city ||
        address.village ||
        address.county ||
        address.state ||
        "Location not specific";
      return `${detailedAddress}`;
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unable to fetch address";
    }
  };

  //function for manual address input in case location can't be retrieved
  const handleManualInput = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const address = event.target.address.value;
    try {
      // Google Geocoding API endpoint to retrieve latitude and longitude based on entered place
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_GOOGLE_MAPS}`;
      console.log("Requesting:", geocodeUrl);
      const response = await axios.get(geocodeUrl);
      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;

        setLocation({
          loaded: true,
          coordinates: { lat, lng },
          address: results[0].formatted_address,
        });
        onCoordinates({ lat, lng });
      } else {
        console.error("No results found for this address.");
        alert(
          "No results found for the entered address. Please try a different address."
        );
      }
    } catch (error) {
      console.error("Error in geocoding:", error);
      alert(
        "An error occurred while trying to fetch location data. Please try again later."
      );
    }
  };

  return (
    <div className="location-container">
      {manualEntry && !formSubmitted ? (
        <form onSubmit={handleManualInput}>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            className="address-input"
          />
          <button type="submit">Submit</button>
        </form>
      ) : location.loaded ? (
        <div className="location-address">{location.address}</div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Location;
