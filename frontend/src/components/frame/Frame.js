import React from "react";
import "./Frame.css";

const Frame = ({ id, title, children, className }) => {
  return (
    <div className={`account-frame ${className}`} id={id}>
      <div className="title">{title}</div>
      {children}
    </div>
  );
};

export default Frame;
