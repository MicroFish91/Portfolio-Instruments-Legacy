'use strict';
module.exports = (sequelize, DataTypes) => {
  const Real_Assets = sequelize.define('Real_Assets', {
    commodoties: DataTypes.DECIMAL(2),
    gold: DataTypes.DECIMAL(2),
    reits: DataTypes.DECIMAL(2)
  }, {});
  Real_Assets.associate = function(models) {
    // Associations
    Real_Assets.belongsTo(models.accounts);
  };
  return Real_Assets;
};