const axios = require("axios");
const querystring = require("querystring");
const {
  PHILIPS_HUE_CLIENT_ID,
  PHILIPS_HUE_CLIENT_SECRET,
  PHILIPS_REDIRECT_URI,
} = require("../config");

let globalToken = null;

const authenticate = (req, res) => {
  // Hardcoded state for demonstration. In a real-world scenario, this is NOT recommended.
  const state = "fixedStateValue";
  const authUrl = `https://api.meethue.com/v2/oauth2/authorize?client_id=${PHILIPS_HUE_CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(
    PHILIPS_REDIRECT_URI
  )}`;
  res.redirect(authUrl);
};

const callback = async (req, res) => {
  try {
    const code = req.query.code;
    const receivedState = req.query.state;
    const expectedState = "fixedStateValue"; // The same fixed state value.

    if (receivedState !== expectedState) {
      return res.status(401).json({ error: "Invalid state parameter" });
    }

    const credentials = Buffer.from(
      `${PHILIPS_HUE_CLIENT_ID}:${PHILIPS_HUE_CLIENT_SECRET}`
    ).toString("base64");
    const requestBody = querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: PHILIPS_REDIRECT_URI,
    });

    const tokenResponse = await axios.post(
      "https://api.meethue.com/v2/oauth2/token",
      requestBody,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
      }
    );
    console.log("Received token:", tokenResponse.data);
    globalToken = tokenResponse.data;
    res.redirect(
      `http://localhost:3000/AboutUs?token=${globalToken.access_token}`
    );
  } catch (error) {
    console.error("Error during token exchange:", error);
    res.status(500).json({ error: "Error during token exchange" });
  }
};

const pressLinkButton = async () => {
  if (!globalToken || !globalToken.access_token) {
    throw new Error(
      "No access token available. User might not be authenticated."
    );
  }

  try {
    const response = await axios.put(
      "https://api.meethue.com/bridge/0/config",
      { linkbutton: true },
      {
        headers: {
          Authorization: `Bearer ${globalToken.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error pressing link button:",
      error.response ? error.response.data : error
    );
    throw error;
  }
};

const createUser = async (req, res) => {
  if (!globalToken || !globalToken.access_token) {
    return res.status(401).json({
      error: "No access token available. User might not be authenticated.",
    });
  }

  try {
    await pressLinkButton();
    const userResponse = await axios.post(
      "https://api.meethue.com/bridge/",
      { devicetype: "myremotehueapp" },
      {
        headers: {
          Authorization: `Bearer ${globalToken.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json(userResponse.data);
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ error: "Error creating user" });
  }
};

const getLights = async (req, res) => {
  const username = req.query.username;

  if (!globalToken || !globalToken.access_token) {
    return res.status(401).json({
      error: "No access token available. User might not be authenticated.",
    });
  }

  if (!username) {
    return res.status(400).json({ error: "Username is required." });
  }

  try {
    const lightsResponse = await axios.get(
      `https://api.meethue.com/bridge/${username}/lights`,
      {
        headers: { Authorization: `Bearer ${globalToken.access_token}` },
      }
    );
    res.json(lightsResponse.data);
  } catch (error) {
    console.error(
      "Error fetching lights:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ error: "Error fetching lights" });
  }
};

module.exports = {
  authenticate,
  callback,
  getLights,
  createUser,
};
