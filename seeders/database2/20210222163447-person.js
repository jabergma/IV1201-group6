"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Person",
      [
        {
          name: "Greta",
          surname: "Borg",
          ssn: "",
          email: "",
          password: "wl9nk23a",
          username: "borg",
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Per",
          surname: "Strand",
          ssn: "19671212-1211",
          email: "per@strand.kth.se",
          password: "",
          username: "",
          role_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Person", null, {});
  },
};
