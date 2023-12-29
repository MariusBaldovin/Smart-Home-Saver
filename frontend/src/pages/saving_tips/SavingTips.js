import React from "react";
import { useLocation } from "react-router-dom";
import "./SavingTips.css"; // Import the CSS file

const SavingTips = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations;

  return (
    <div className="saving-tips-container">
      <h2 className="saving-tips-header">Energy Saving Recommendations</h2>
      <ul className="saving-tips-list">
        {recommendations &&
          recommendations.map((tip, index) => (
            <li key={index} className="saving-tip">
              {tip}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SavingTips;
