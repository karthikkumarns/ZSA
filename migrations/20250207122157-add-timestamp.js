module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("otpLogins", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("otpLogins", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("otpLogins", "createdAt");
    await queryInterface.removeColumn("otpLogins", "updatedAt");
  },
};
