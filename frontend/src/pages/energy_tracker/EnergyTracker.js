import React from "react";
import "./EnergyTracker.css";
import RequireAuth from "../../utils/RequireAuth";
import SmartMeterInput from "../../components/smart_meter_input/SmartMeterInput";

const EnergyTracker = () => {
  return (
    <div className="energy-tracker-container">
      <RequireAuth>
        <SmartMeterInput />
      </RequireAuth>
    </div>
  );
};

export default EnergyTracker;
