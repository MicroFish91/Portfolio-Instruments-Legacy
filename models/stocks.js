'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define('Stocks', {
    tsm: DataTypes.DECIMAL(2),
    d_lcb: DataTypes.DECIMAL(2),
    d_lcv: DataTypes.DECIMAL(2),
    d_lcg: DataTypes.DECIMAL(2),
    d_mcb: DataTypes.DECIMAL(2),
    d_mcv: DataTypes.DECIMAL(2),
    d_mcg: DataTypes.DECIMAL(2),
    d_scb: DataTypes.DECIMAL(2),
    d_scv: DataTypes.DECIMAL(2),
    d_scg: DataTypes.DECIMAL(2),
    i_lcb: DataTypes.DECIMAL(2),
    i_lcv: DataTypes.DECIMAL(2),
    i_lcg: DataTypes.DECIMAL(2),
    i_mcb: DataTypes.DECIMAL(2),
    i_mcv: DataTypes.DECIMAL(2),
    i_mcg: DataTypes.DECIMAL(2),
    i_scb: DataTypes.DECIMAL(2),
    i_scv: DataTypes.DECIMAL(2),
    i_scg: DataTypes.DECIMAL(2)
  }, {});
  Stocks.associate = function(models) {
    // Associations
      Stocks.belongsTo(models.accounts);
  };
  return Stocks;
};