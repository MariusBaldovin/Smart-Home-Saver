const axios = require("axios");
const { generateUniqueState } = require("../utils/generateUniqueState");
const {
  NETATMO_CLIENT_ID,
  NETATMO_CLIENT_SECRET,
  REDIRECT_URI,
} = require("../config");

//NETATMO AUTHENTICATION
const authenticate = (req, res) => {
  const state = generateUniqueState();
  const authUrl = `https://api.netatmo.com/oauth2/authorize?client_id=${NETATMO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=read_thermostat&state=${state}`;
  res.redirect(authUrl);
};

// Callback after successful authentication
const callback = async (req, res) => {
  try {
    const code = req.query.code;
    const tokenResponse = await axios.post(
      "https://api.netatmo.com/oauth2/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: NETATMO_CLIENT_ID,
        client_secret: NETATMO_CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    res.cookie("netatmo_token", tokenResponse.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.redirect(`http://localhost:3000/MyAccount`);
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.status(500).json({ error: "Error during token exchange" });
  }
};

//HOMESTATUS TO GET ALL INFORMATION FROM THERMOSTAT
const getTemperature = async (req, res) => {
  const token = req.cookies["netatmo_token"];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get("https://api.netatmo.com/api/homestatus", {
      params: {
        access_token: token,
        home_id: req.params.homeId,
      },
    });

    const rooms = response.data.body.home.rooms;
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching home status:", error);
    res.status(500).json({ error: "Error fetching home status" });
  }
};

//HOMESDATA TO RETRIEVE HOME ID
const getHomes = async (req, res) => {
  const token = req.cookies["netatmo_token"];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get("https://api.netatmo.com/api/homesdata", {
      params: { access_token: token },
    });

    res.json(response.data.body.homes);
  } catch (error) {
    console.error("Error fetching homes:", error);
    res.status(500).json({ error: "Error fetching homes" });
  }
};

// Endpoint to change the temperature
const setTemperature = async (req, res) => {
  const token = req.cookies["netatmo_token"];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    await axios.post("https://api.netatmo.com/api/setroomthermpoint", {
      access_token: token,
      home_id: req.body.homeId,
      room_id: req.body.roomId,
      mode: "manual",
      temp: req.body.temperature,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error setting temperature:", error);
    res.status(500).json({ error: "Error setting temperature" });
  }
};

// Logout endpoint
const logout = (req, res) => {
  res.clearCookie("netatmo_token");
  res.status(200).json({ message: "Logged out" });
};

//Check if user is authenticated or not
const checkAuth = (req, res) => {
  console.log("Received request for authentication check");
  if (req.cookies) {
    console.log("Cookies:", req.cookies);
  } else {
    console.log("No cookies found in the request");
  }

  if (req.cookies && req.cookies["netatmo_token"]) {
    console.log("User is authenticated");
    res.status(200).json({ message: "Authenticated" });
  } else {
    console.log("User is not authenticated");
    res.status(401).json({ message: "Not authenticated" });
  }
};

module.exports = {
  authenticate,
  callback,
  getTemperature,
  getHomes,
  setTemperature,
  logout,
  checkAuth,
};
