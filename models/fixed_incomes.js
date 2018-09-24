'use strict';
module.exports = (sequelize, DataTypes) => {
  const fixed_incomes = sequelize.define('fixed_incomes', {
    ltb: DataTypes.JSON,
    itb: DataTypes.JSON,
    stb: DataTypes.JSON,
    bills: DataTypes.JSON,
    accountsId: DataTypes.INTEGER
  }, {});
  fixed_incomes.associate = function(models) {
    // Associations
    fixed_incomes.belongsTo(models.accounts);
  };
  return fixed_incomes;
};