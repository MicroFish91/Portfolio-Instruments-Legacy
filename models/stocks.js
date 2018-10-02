'use strict';
module.exports = (sequelize, DataTypes) => {
  const stocks = sequelize.define('stocks', {
    tsm: DataTypes.JSON,
    dlcb: DataTypes.JSON,
    dlcv: DataTypes.JSON,
    dlcg: DataTypes.JSON,
    dmcb: DataTypes.JSON,
    dmcv: DataTypes.JSON,
    dmcg: DataTypes.JSON,
    dscb: DataTypes.JSON,
    dscv: DataTypes.JSON,
    dscg: DataTypes.JSON,
    ilcb: DataTypes.JSON,
    ilcv: DataTypes.JSON,
    ilcg: DataTypes.JSON,
    imcb: DataTypes.JSON,
    imcv: DataTypes.JSON,
    imcg: DataTypes.JSON,
    iscb: DataTypes.JSON,
    iscv: DataTypes.JSON,
    iscg: DataTypes.JSON,
    accountId: DataTypes.INTEGER
  }, {});
  stocks.associate = function(models) {
    // Associations
      stocks.belongsTo(models.accounts);
  };
  return stocks;
};

