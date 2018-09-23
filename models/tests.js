'use strict';
module.exports = (sequelize, DataTypes) => {
  const tests = sequelize.define('Tests', {
    test: DataTypes.JSON
  }, {});
  tests.associate = function(models) {
    // associations can be defined here
  };
  return tests;
};