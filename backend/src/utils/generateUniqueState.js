const crypto = require("crypto");

const generateUniqueState = () => {
  return crypto.randomBytes(16).toString("hex");
};

module.exports = { generateUniqueState };
