"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Competence_profile", {
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
      competence_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Competence",
          key: "id",
        },
        allownNull: false,
      },
      years_of_experience: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Competence_profile");
  },
};
