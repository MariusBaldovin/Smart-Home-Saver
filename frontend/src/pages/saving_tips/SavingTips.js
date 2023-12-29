import React from "react";
import { useLocation } from "react-router-dom";
import Frame from "../../components/frame/Frame";
import "./SavingTips.css";

const SavingTips = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations;
  const titles = [
    "Smart Meter",
    "Smart Thermostat",
    "Smart Lights",
    "Daily Routine",
    "Washing Machine",
  ];

  return (
    <div className="saving-tips-container">
      <h2 className="saving-tips-header">Energy Saving Recommendations</h2>
      {recommendations &&
        recommendations.map((tip, index) => (
          <Frame
            key={index}
            id={`frame-${index}`}
            title={titles[index]}
            className="left-align-title"
          >
            <p>{tip}</p>
          </Frame>
        ))}
    </div>
  );
};

export default SavingTips;
