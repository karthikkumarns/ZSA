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
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      country_code: {
        type: DataTypes.STRING,
        defaultValue: 91,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otp_token: {
        type: DataTypes.UUID,
        allowNull: false,
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
