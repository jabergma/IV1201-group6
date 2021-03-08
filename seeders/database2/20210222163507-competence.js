"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Competence",
      [
        {
          name: "Korvgrillning",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Karuselldrift",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Competence", null, {});
  },
};
