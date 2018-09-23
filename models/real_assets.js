'use strict';
module.exports = (sequelize, DataTypes) => {
  const real_assets = sequelize.define('real_assets', {
    commodoties: DataTypes.JSON,
    gold: DataTypes.JSON,
    reits: DataTypes.JSON
  }, {});
  real_assets.associate = function(models) {
    // Associations
    real_assets.belongsTo(models.accounts);
  };
  return real_assets;
};