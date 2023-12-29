const express = require("express");
const cors = require("cors");
const netatmoRoutes = require("./routes/netatmoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(netatmoRoutes);

module.exports = app;
