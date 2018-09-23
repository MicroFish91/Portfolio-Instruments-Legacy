'use strict';
module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    holdingLocation: DataTypes.STRING,
    accountType: DataTypes.STRING(15),
    moneyMarket: DataTypes.DECIMAL(2),
  }, {});
  Accounts.associate = function(models) {
    // Associations
    Accounts.hasOne(models.stocks);
    Accounts.hasOne(models.fixed_income);
    Accounts.hasOne(models.real_assets);
  };
  return Accounts;
};