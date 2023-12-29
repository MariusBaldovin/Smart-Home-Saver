import React from "react";
import "./Question.css";

const Question = ({ id, text, options, selectedAnswer, onSelect }) => {
  return (
    <div className="question">
      <h3>{text}</h3>
      <div className="options">
        {options.map((option) => (
          <button
            key={option}
            className={`option ${selectedAnswer === option ? "selected" : ""}`}
            onClick={() => onSelect(id, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
