const axios = require("axios");

exports.processChat = async (req, res) => {
  try {
    const response = await axios.post(
      "http://api.openai.com/v1/chat/completions",
      req.body,
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error in processChat:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
