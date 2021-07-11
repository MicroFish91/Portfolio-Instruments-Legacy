const bcrypt = require("bcryptjs");
const { PORTFOLIO_BENCHMARKS } = require("../../config/constants");

// Generates a fake user seed for each of the benchmarks available
module.exports = function generateUsers() {
  const userSeeds = {};
  userSeeds.up = [];
  userSeeds.down = [];

  PORTFOLIO_BENCHMARKS.forEach((benchmark, index) => {
    userSeeds.up.push({
      userName: `user${index + 1}@gmail.com`,
      userPassword: bcrypt.hashSync("1234", 8),
      benchmark: benchmark,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    userSeeds.down.push(`user${index + 1}@gmail.com`);
  });

  return userSeeds;
};
