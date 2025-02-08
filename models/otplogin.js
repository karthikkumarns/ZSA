"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class otpLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  otpLogin.init(
    {
      user_id: {
        type: DataTypes.UUID,
      },
      country_code: {
        type: DataTypes.STRING,
        defaultValue: 91,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
      otp_token: {
        type: DataTypes.STRING,
      },
      otp: {
        type: DataTypes.STRING,
      },
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "otpLogin",
    }
  );
  return otpLogin;
};
