"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Competence_profile",
      [
        {
          person_id: 2,
          competence_id: 1,
          years_of_experience: 3.5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          person_id: 2,
          competence_id: 2,
          years_of_experience: 2.0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Competence_profile", null, {});
  },
};
