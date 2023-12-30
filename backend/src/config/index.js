require("dotenv").config();

module.exports = {
  NETATMO_CLIENT_ID: process.env.NETATMO_CLIENT_ID,
  NETATMO_CLIENT_SECRET: process.env.NETATMO_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,

  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
};
