'use strict';
module.exports = (sequelize, DataTypes) => {
  const snapshots = sequelize.define('snapshots', {
    title: DataTypes.STRING(30),
    stockTotal: DataTypes.DECIMAL,
    fixedIncomeTotal: DataTypes.DECIMAL,
    cashTotal: DataTypes.DECIMAL,
    commodotiesTotal: DataTypes.DECIMAL,
    weightedER: DataTypes.DECIMAL,
    notes: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  snapshots.associate = function(models) {
    // Associations
    snapshots.hasMany(models.accounts);
    snapshots.belongsTo(models.users);
  };
  return snapshots;
};