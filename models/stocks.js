'use strict';
module.exports = (sequelize, DataTypes) => {
  const stocks = sequelize.define('stocks', {
    tsm: DataTypes.JSON,
    d_lcb: DataTypes.JSON,
    d_lcv: DataTypes.JSON,
    d_lcg: DataTypes.JSON,
    d_mcb: DataTypes.JSON,
    d_mcv: DataTypes.JSON,
    d_mcg: DataTypes.JSON,
    d_scb: DataTypes.JSON,
    d_scv: DataTypes.JSON,
    d_scg: DataTypes.JSON,
    i_lcb: DataTypes.JSON,
    i_lcv: DataTypes.JSON,
    i_lcg: DataTypes.JSON,
    i_mcb: DataTypes.JSON,
    i_mcv: DataTypes.JSON,
    i_mcg: DataTypes.JSON,
    i_scb: DataTypes.JSON,
    i_scv: DataTypes.JSON,
    i_scg: DataTypes.JSON,
    accountId: DataTypes.INTEGER
  }, {});
  stocks.associate = function(models) {
    // Associations
      stocks.belongsTo(models.accounts);
  };
  return stocks;
};