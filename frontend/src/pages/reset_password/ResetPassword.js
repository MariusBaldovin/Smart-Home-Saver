import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailErrors, setEmailErrors] = useState({});

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!emailValue) {
      setEmailErrors({}); // Clear errors when input is empty
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailErrors({ invalid: "Invalid email address" });
    } else {
      setEmailErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setEmailErrors({ empty: "Email is required" });
      return;
    }

    if (Object.keys(emailErrors).length === 0) {
      try {
        await sendPasswordResetEmail(auth, email);
        setMessage(
          `We've sent a link to ${email}. If this email has a Smart Home Saver account, you will receive a reset password email.`
        );
        setEmailSent(true);
      } catch (err) {
        setError("Failed to reset password. Please try again later.");
      }
    }
  };

  return (
    <div className="reset_password-container">
      <form className="reset_password-form" onSubmit={handleSubmit} noValidate>
        <h1>Reset Password</h1>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        {!emailSent && (
          <div className="email-error">
            <input
              id="email-input"
              type="email"
              placeholder={
                Object.keys(emailErrors).length === 0
                  ? "Your Email Address"
                  : ""
              }
              value={email}
              onChange={handleEmailChange}
              className={emailErrors.invalid ? "input-error" : ""}
            />
            {emailErrors.empty && (
              <p className="error_empty-field">{emailErrors.empty}</p>
            )}
            {emailErrors.invalid && (
              <p className="error">{emailErrors.invalid}</p>
            )}
          </div>
        )}
        <button className="reset" type="submit">
          {emailSent ? "Send Me the Link Again" : "Reset Password"}
        </button>

        <p className="back-to-signin">
          <NavLink to="/SignIn">Back to Sign In</NavLink>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
