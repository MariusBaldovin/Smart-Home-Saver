import React, { useState } from "react";
import "./ThermostatSchedule.css";

const ThermostatSchedule = ({ forecastData }) => {
  const [availability, setAvailability] = useState({ start: "", end: "" });
  const [comfortTemperature, setComfortTemperature] = useState(15); // Default comfort temperature
  const [generatedSchedule, setGeneratedSchedule] = useState({});
  const [currentMode, setCurrentMode] = useState("comfort"); // Default current mode to "comfort"

  const handleInputChange = (e) => {
    if (e.target.name === "comfortTemperature") {
      setComfortTemperature(e.target.value);
    } else {
      setAvailability({ ...availability, [e.target.name]: e.target.value });
    }
  };

  const generateSchedule = (mode) => {
    let schedule = {};
    for (const [day, forecasts] of Object.entries(forecastData)) {
      schedule[day] = createDailySchedule(
        forecasts,
        availability,
        comfortTemperature,
        mode
      );
    }
    console.log(schedule); // Log the generated schedule
    setGeneratedSchedule(schedule);
  };

  const createDailySchedule = (forecasts, availability, comfortTemp, mode) => {
    let dailySchedule = [];

    // Convert availability times to hours for comparison
    const startHour = parseInt(availability.start.split(":")[0]);
    const endHour = parseInt(availability.end.split(":")[0]) - 1; // Deduct 1 hour for warming up

    forecasts.forEach((forecast) => {
      const forecastHour = new Date(forecast.dt * 1000).getHours();
      let recommendedTemp = parseInt(comfortTemp);

      // Check if the forecast hour is within the user's away time
      if (forecastHour >= startHour && forecastHour <= endHour) {
        if (forecast.main.temp < comfortTemp) {
          recommendedTemp = comfortTemp - 6;
        } else {
          recommendedTemp = 5; // Freezing mode
        }
      } else if (forecastHour >= 22 || forecastHour <= 6) {
        // Assuming night time is between 10 PM to 6 AM
        recommendedTemp = comfortTemp - 2;
      }

      // Apply Saving Energy Mode adjustments
      if (mode === "saving") {
        recommendedTemp -= 2;
      }

      dailySchedule.push({
        time: forecast.dt_txt,
        recommendedTemp,
      });
    });

    return dailySchedule;
  };

  return (
    <div classname="thermostat-schedule-container">
      <h3>Set time interval when nobody is home</h3>
      <div className="time_interval-input">
        <input
          className="time_input"
          type="time"
          name="start"
          value={availability.start}
          onChange={handleInputChange}
          placeholder="Start Time"
        />
        <input
          className="time_input"
          type="time"
          name="end"
          value={availability.end}
          onChange={handleInputChange}
          placeholder="End Time"
        />
      </div>
      <h3>Set your comfort temperature</h3>
      <div className="comfort-temperature-input">
        <button
          onClick={() => setComfortTemperature((prev) => Math.max(prev - 1, 0))}
        >
          -
        </button>
        <input
          type="number"
          name="comfortTemperature"
          value={comfortTemperature}
          onChange={handleInputChange}
          placeholder="Comfort Temperature"
        />
        <button onClick={() => setComfortTemperature((prev) => prev + 1)}>
          +
        </button>
      </div>
      <div className="schedule_mode-buttons">
        <button
          className="schedule_button"
          onClick={() => {
            setCurrentMode("comfort");
            generateSchedule("comfort");
          }}
        >
          Comfort Mode Schedule
        </button>
        <button
          className="schedule_button"
          onClick={() => {
            setCurrentMode("saving");
            generateSchedule("saving");
          }}
        >
          Energy Saving Mode Schedule
        </button>
      </div>
      <div className="recommend-container">
        <h4>Your Thermostat Schedule Recommendation</h4>
        {/* Displaying the generated schedule */}
        <div>
          {Object.entries(generatedSchedule).map(
            ([day, daySchedule], index) => (
              <div key={index} className="recommend_day">
                <h3 className="recommend-date">{day}</h3>
                <div className="recommend-details">
                  {daySchedule.map((scheduleItem, idx) => (
                    <div
                      key={idx}
                      className={`recommend-box ${
                        currentMode === "saving"
                          ? "saving-mode"
                          : "comfort-mode"
                      }`}
                    >
                      <div className="recommend-time">
                        {new Date(scheduleItem.time).toLocaleTimeString()}
                      </div>
                      <div className="recommend-temp">
                        {scheduleItem.recommendedTemp}°C
                      </div>
                      <div className="recommend-description">
                        {currentMode.charAt(0).toUpperCase() +
                          currentMode.slice(1)}{" "}
                        Mode
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ThermostatSchedule;
