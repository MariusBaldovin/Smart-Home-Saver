const axios = require("axios");
const { generateUniqueState } = require("../utils/generateUniqueState");
const {
  NETATMO_CLIENT_ID,
  NETATMO_CLIENT_SECRET,
  REDIRECT_URI,
} = require("../config");

let globalToken = null;

//NETATMO AUTHENTICATION
const authenticate = (req, res) => {
  const state = generateUniqueState();
  const authUrl = `https://api.netatmo.com/oauth2/authorize?client_id=${NETATMO_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=read_thermostat&state=${state}`;
  res.redirect(authUrl);
};

//CALLBACK AFTER SUCCESFULLY AUTHENTICATION
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

    globalToken = tokenResponse.data;
    res.redirect(
      `http://localhost:3000/MyAccount?token=${globalToken.access_token}`
    );
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.status(500).json({ error: "Error during token exchange" });
  }
};

//HOMESTATUS TO GET ALL INFORMATION FROM THERMOSTAT
const getTemperature = async (req, res) => {
  if (!globalToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get("https://api.netatmo.com/api/homestatus", {
      params: {
        access_token: globalToken.access_token,
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
  if (!globalToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await axios.get("https://api.netatmo.com/api/homesdata", {
      params: { access_token: globalToken.access_token },
    });

    res.json(response.data.body.homes);
  } catch (error) {
    console.error("Error fetching homes:", error);
    res.status(500).json({ error: "Error fetching homes" });
  }
};

// Endpoint to change the temperature
const setTemperature = async (req, res) => {
  if (!globalToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    await axios.post("https://api.netatmo.com/api/setroomthermpoint", {
      access_token: globalToken.access_token,
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

module.exports = {
  authenticate,
  callback,
  getTemperature,
  getHomes,
  setTemperature,
};
