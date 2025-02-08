const db = require("../../models");

exports.subscriptionRequest = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const subscription = await db.subscription.create({ email });

    return res
      .status(201)
      .json({ message: "Subscription successful", request: subscription });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
