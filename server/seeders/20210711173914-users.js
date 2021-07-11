"use strict";
const { Op } = require("sequelize");
const { generateUsers } = require("../utils/generateSeedUtils");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", generateUsers().up, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "users",
      { userName: { [Op.or]: generateUsers().down } },
      {}
    );
  },
};
