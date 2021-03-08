"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Availability", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      person_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Person",
          key: "id",
        },
        allownNull: false,
      },
      from_date: {
        type: Sequelize.DATEONLY,
        allownNull: false,
      },
      to_date: {
        type: Sequelize.DATEONLY,
        allownNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Availability");
  },
};
