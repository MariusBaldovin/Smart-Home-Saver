import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the signInWithEmailAndPassword function
import { useAuth } from "../../context/Authcontext"; // Import the useAuth hook for authentication
import "./SignIn.css";
import { FaGoogle } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState({});
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const navigate = useNavigate(); // Use the useNavigate hook to navigate to other pages
  const { signIn, signInWithGoogle, signInWithFacebook } = useAuth(); // Get the signIn, google and facebook functions from your authentication context

  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (!/\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailErrors({
        invalid: "Invalid email address",
      });
    } else {
      setEmailErrors({});
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length < 8) {
      setPasswordErrors({
        minLength: "Password must be minimum 8 characters",
      });
    } else {
      setPasswordErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    // Email validation logic
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "";
    }

    // Password validation logic
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "";
    }

    setErrors(errors);

    // Check if there are no validation errors
    if (Object.keys(errors).length === 0) {
      try {
        // Perform Firebase login with email and password
        await signIn(email, password);
        navigate("/"); // Redirect the user to the home page after successful login
      } catch (error) {
        console.error("Error signing in:", error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); //redirect user to the home page after succesfully login with google account
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      // Handle the error, possibly by displaying it to the user
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
      navigate("/"); //redirect user to the home page after succesfully login with facebook account
    } catch (error) {
      console.error("Error signing in with Facebook:", error.message);
      // Handle the error, possibly by displaying it to the user
    }
  };

  return (
    <div className="sign_in-container">
      <form className="signin-form" onSubmit={handleSubmit} noValidate>
        <h1>Sign In</h1>
        {/* Email Input and error handling */}
        <div className="name-error">
          <input
            id="email-input"
            type="email"
            placeholder={!email && !errors.email ? "Email" : ""}
            value={email}
            onChange={handleEmailChange}
            className={emailErrors.invalid ? "input-error" : ""}
          />
          {!email && errors.email && (
            <p className="error_empty-field">{errors.email}</p>
          )}
          {emailErrors.invalid && (
            <p className="error">{emailErrors.invalid}</p>
          )}
        </div>

        {/* Password Input and error handling */}
        <div className="name-error">
          <input
            id="password-input"
            type="password"
            placeholder={!password && !errors.password ? "Password" : ""}
            value={password}
            onChange={handlePasswordChange}
            className={passwordErrors.minLength ? "input-error" : ""}
          />
          {!password && errors.password && (
            <p className="error_empty-field">{errors.password}</p>
          )}
          {passwordErrors.minLength && (
            <p className="error">{passwordErrors.minLength}</p>
          )}
        </div>
        <p id="forgot">
          <NavLink to="/ResetPassword">Forgot password?</NavLink>
        </p>

        <button className="login" type="submit">
          Login
        </button>

        <p className="message">
          Don't have an account? <NavLink to="/SignUp">Sign up</NavLink>
        </p>

        <button className="google" onClick={handleGoogleSignIn}>
          <FaGoogle />
          Login with Google
        </button>

        <button className="facebook" onClick={handleFacebookSignIn}>
          <BsFacebook />
          Login with Facebook
        </button>
      </form>
    </div>
  );
};

export default SignIn;
