import React from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import "../../src/pages/sign_in/SignIn.css";

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    // User is not logged in, display a message and a login link
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          margin: "20px",
          fontSize: "30px",
        }}
      >
        <p>You must be logged in to access this feature.</p>
        <button className="login" onClick={() => navigate("/SignIn")}>
          Log In
        </button>
      </div>
    );
  }

  // User is logged in, render the children components
  return children;
};

export default RequireAuth;
