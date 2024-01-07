const express = require("express");
const router = express.Router();
const netatmoController = require("../controllers/netatmoController");

router.get("/auth/netatmo", netatmoController.authenticate);
router.get("/auth/netatmo/callback", netatmoController.callback);
router.get("/api/temperature/:homeId", netatmoController.getTemperature);
router.get("/api/homes", netatmoController.getHomes);
router.post("/api/setTemperature", netatmoController.setTemperature);
router.get("/api/logout", netatmoController.logout);
router.get("/api/checkAuth", netatmoController.checkAuth);

module.exports = router;
