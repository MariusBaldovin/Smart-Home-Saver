const express = require("express");
const cors = require("cors");
const session = require("express-session");
const netatmoRoutes = require("./routes/netatmoRoutes");
const chatGptRoutes = require("./routes/chatgptRoutes");
const philipsHueRoutes = require("./routes/philipsHueRoutes");

const app = express();

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // must be set to true if using https
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(netatmoRoutes);
app.use("/api/chat", chatGptRoutes);
app.use(philipsHueRoutes);

module.exports = app;
