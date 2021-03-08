"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          name: "recruit",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "applicant",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Role", null, {});
  },
};
