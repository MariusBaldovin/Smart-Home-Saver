const express = require("express");
const cors = require("cors");
const netatmoRoutes = require("./routes/netatmoRoutes");
const chatGptRoutes = require("./routes/chatgptRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(netatmoRoutes);
app.use("/api/chat", chatGptRoutes);

module.exports = app;
