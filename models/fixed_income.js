'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fixed_Income = sequelize.define('Fixed_Income', {
    ltb: DataTypes.DECIMAL(2),
    itb: DataTypes.DECIMAL(2),
    stb: DataTypes.DECIMAL(2),
    bills: DataTypes.DECIMAL(2)
  }, {});
  Fixed_Income.associate = function(models) {
    // Associations
    Fixed_Income.belongsTo(models.accounts);
  };
  return Fixed_Income;
};