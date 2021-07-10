'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tsm: {
        type: Sequelize.JSON
      },
      dlcb: {
        type: Sequelize.JSON
      },
      dlcv: {
        type: Sequelize.JSON
      },
      dlcg: {
        type: Sequelize.JSON
      },
      dmcb: {
        type: Sequelize.JSON
      },
      dmcv: {
        type: Sequelize.JSON
      },
      dmcg: {
        type: Sequelize.JSON
      },
      dscb: {
        type: Sequelize.JSON
      },
      dscv: {
        type: Sequelize.JSON
      },
      dscg: {
        type: Sequelize.JSON
      },
      ilcb: {
        type: Sequelize.JSON
      },
      ilcv: {
        type: Sequelize.JSON
      },
      ilcg: {
        type: Sequelize.JSON
      },
      imcb: {
        type: Sequelize.JSON
      },
      imcv: {
        type: Sequelize.JSON
      },
      imcg: {
        type: Sequelize.JSON
      },
      iscb: {
        type: Sequelize.JSON
      },
      iscv: {
        type: Sequelize.JSON
      },
      iscg: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('stocks');
  }
};