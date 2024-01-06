import React, { useState } from "react";
import "./Home.css";
import homeLogo from "../../assets/home.png";
import Question from "../../components/question/Question";
import Recommendations from "../../components/recommendations/Recommendations";
import Frame from "../../components/frame/Frame";

const Home = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const questions = [
    {
      id: 1,
      text: "Do you have a smart meter installed in your home?",
      options: ["YES", "NO"],
    },

    {
      id: 2,
      text: "What type of heating do you use at home?",
      options: ["GAS", "ELECTRIC", "OTHER"],
    },

    {
      id: 3,
      text: "How would you describe your lighting preferences?",
      options: ["REGULAR LIGHTS", "LIGHTS THAT CAN CHANGE COLOR"],
    },

    {
      id: 4,
      text: "Do you have specific daily routines or habits?",
      options: [
        "YES, I HAVE CONSISTENT DAILY ROUTINE",
        "NO, MY SCHEDULE VARIES",
      ],
    },

    {
      id: 5,
      text: "How often do you use your washing machine?",
      options: ["DAILY", "SEVERAL TIMES A WEEK", "ONCE A WEEK"],
    },
  ];

  const titles = [
    "Smart Meter",
    "Smart Thermostat",
    "Smart Lights",
    "Daily Routine",
    "Washing Machine",
  ];

  const handleSelect = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const handleSubmit = () => {
    const generatedRecommendations = Recommendations(selectedAnswers);
    setRecommendations(generatedRecommendations);
    setShowRecommendations(true);
  };

  const handleBack = () => {
    setShowRecommendations(false);
  };

  return (
    <div className="home-container">
      <div className="left-panel">
        <h2>Welcome to your smart energy saving</h2>
        <img src={homeLogo} alt="3D Effect" className="home_image" />
      </div>
      <div className="right-panel">
        {showRecommendations ? (
          <div>
            <h2>Energy Saving Recommendations</h2>
            {recommendations.map((tip, index) => (
              <Frame
                key={index}
                id={`frame-${index}`}
                title={titles[index]}
                className="left-align-title"
              >
                <p>{tip}</p>
              </Frame>
            ))}
            <button className="submit-button" onClick={handleBack}>
              Go Back
            </button>
          </div>
        ) : (
          <>
            <h2>Help Us Personalise Your Smart Home Recommendations</h2>
            <div className="survey">
              {questions.map((question) => (
                <Question
                  key={question.id}
                  id={question.id}
                  text={question.text}
                  options={question.options}
                  selectedAnswer={selectedAnswers[question.id]}
                  onSelect={handleSelect}
                />
              ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
