require("dotenv").config();

module.exports = {
  NETATMO_CLIENT_ID: process.env.NETATMO_CLIENT_ID,
  NETATMO_CLIENT_SECRET: process.env.NETATMO_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,

  PHILIPS_HUE_CLIENT_ID: process.env.PHILIPS_HUE_CLIENT_ID,
  PHILIPS_HUE_CLIENT_SECRET: process.env.PHILIPS_HUE_CLIENT_SECRET,
  PHILIPS_REDIRECT_URI: process.env.PHILIPS_REDIRECT_URI,

  FRONTEND_URL: process.env.FRONTEND_URL,
};
