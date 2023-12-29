import React, { useState, useEffect } from "react";
import "./Location.css";

const Location = ({ onCoordinates }) => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
    address: null,
  });

  const onSuccess = async (location) => {
    const { latitude, longitude } = location.coords;
    onCoordinates({ lat: latitude, lng: longitude });

    const address = await fetchAddress(latitude, longitude);

    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
      address,
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.address;

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
      return "Error fetching address";
    }
  };

  return (
    <div className="location-container">
      {location.loaded ? (
        <div className="location-address">{location.address}</div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Location;
