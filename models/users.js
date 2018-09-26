'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    benchmark: DataTypes.STRING(30)
  }, {});
  users.associate = function(models) {
    users.hasMany(models.snapshots);
  };
  return users;
};