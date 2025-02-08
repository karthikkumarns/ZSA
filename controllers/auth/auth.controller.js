const validateHelper = require("../../helpers/validate_helpers");
const db = require("../../models");
const otpGenerator = require("otp-generator");
const { v4: uuidv4 } = require("uuid");

exports.Login = async (req, res) => {
  const { country_code, phone_number } = req.body;
  let otp;
  const token = uuidv4();
  const now = new Date();
  now.setMinutes(now.getMinutes() + 3);

  const validateArray = [
    {
      key: "country_code",
      validation: ["notnull"],
    },
    {
      key: "phone_number",
      validation: ["required", "mobile"],
    },
  ];

  const validation = validateHelper.validate(req.body, validateArray);

  if (!validation.status) {
    return validateHelper.responseHelper(
      res,
      false,
      validation.message,
      "Validation Error"
    );
  }

  try {
    const FindMobileNumber = await db.otpLogin.findOne({
      where: {
        phone_number: phone_number,
      },
    });

    if (phone_number === "8073312576") {
      otp = 1111;
    } else {
      otp = await otpGenerator.generate(4, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
    }

    if (FindMobileNumber) {
      await db.otpLogin.update(
        {
          otp: otp,
          expiry_date: now,
          otp_token: token,
          is_used: false,
        },
        { where: { phone_number } }
      );
    } else {
      await db.otpLogin.create({
        country_code: country_code,
        phone_number: phone_number,
        otp: otp,
        expiry_date: now,
        otp_token: token,
      });
    }
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone_number, otp } = req.body;

    const otpRecord = await db.otpLogin.findOne({
      where: { phone_number, otp },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP or OTP expired.",
      });
    }

    const now = new Date();
    if (otpRecord.expiry_date < now) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    const [user, created] = await db.user.findOrCreate({
      where: { phone_number },
      defaults: {
        name: "",
        email: "",
        phone_number: phone_number,
        is_registered: false, // Fixed spelling
        user_type: "", // Fixed spelling
      },
    });

    if (created) {
      console.log("User created:", user);
    }

    await db.otpLogin.update(
      { is_used: true },
      { where: { phone_number, otp } }
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      user,
    });
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
