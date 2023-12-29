import React from "react";
import "./Frame.css";

const Frame = ({ id, title, children }) => {
  return (
    <div className="account-frame" id={id}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Frame;
