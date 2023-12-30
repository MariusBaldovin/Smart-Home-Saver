const express = require("express");
const router = express.Router();
const chatGptController = require("../controllers/chatGptController");

router.post("/", chatGptController.processChat);

module.exports = router;
