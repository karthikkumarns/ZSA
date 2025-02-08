const db = require("../../models");

exports.userRegistration = async (req, res) => {
  try {
    const { name, email, address, bio, ideology, user_type, phone_number } =
      req.body;

    const otpRecord = await db.otpLogin.findOne({ where: { phone_number } });
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message:
          "Phone number is not verified. Please complete OTP verification.",
      });
    }

    const existingUser = await db.user.findOne({ where: { phone_number } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this phone number.",
      });
    }

    const newUser = await db.user.create({
      name,
      email,
      address,
      user_type,
      bio,
      ideology,
      phone_number,
      is_registered: true,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
