"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Availability",
      [
        {
          person_id: 2,
          from_date: "2014-02-23",
          to_date: "2014-05-25",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          person_id: 2,
          from_date: "2014-07-10",
          to_date: "2014-08-10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Availability", null, {});
  },
};
