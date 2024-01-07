const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const netatmoRoutes = require("./routes/netatmoRoutes");
const chatGptRoutes = require("./routes/chatGptRoutes");
const philipsHueRoutes = require("./routes/philipsHueRoutes");

const app = express();

// Environment variables
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

// CORS configuration
const corsOptions = {
  origin: FRONTEND_ORIGIN,
  credentials: true, // To allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(netatmoRoutes);
app.use("/api/chat", chatGptRoutes);
app.use(philipsHueRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
