const express = require("express");
const router = express.Router();
const philipsHueController = require("../controllers/philipsHueController");

router.get("/auth/philips", philipsHueController.authenticate);
router.get("/auth/philips/callback", philipsHueController.callback);
router.get("/lights", philipsHueController.getLights);
router.post("/createUser", philipsHueController.createUser);

module.exports = router;
