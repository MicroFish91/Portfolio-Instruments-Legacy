'use strict';
module.exports = (sequelize, DataTypes) => {
  const accounts = sequelize.define('accounts', {
    holdingLocation: DataTypes.STRING,
    accountType: DataTypes.STRING(15),
    moneyMarket: DataTypes.JSON,
    total: DataTypes.DECIMAL,
    snapshotId: DataTypes.INTEGER
  }, {});
  
  accounts.associate = function(models) {

    // Associations
    accounts.hasOne(models.stocks);
    accounts.hasOne(models.fixed_incomes);
    accounts.hasOne(models.real_assets);
    accounts.belongsTo(models.snapshots);

  };
  return accounts;
};