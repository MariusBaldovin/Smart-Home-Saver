import React from "react";
import "./Frame.css";

const Frame = ({ id, title, children, className }) => {
  return (
    <div className={`account-frame ${className}`} id={id}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Frame;
