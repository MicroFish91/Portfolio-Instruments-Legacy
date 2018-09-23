'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tsm: {
        type: Sequelize.DECIMAL(2)
      },
      d_lcb: {
        type: Sequelize.DECIMAL(2)
      },
      d_lcv: {
        type: Sequelize.DECIMAL(2)
      },
      d_lcg: {
        type: Sequelize.DECIMAL(2)
      },
      d_mcb: {
        type: Sequelize.DECIMAL(2)
      },
      d_mcv: {
        type: Sequelize.DECIMAL(2)
      },
      d_mcg: {
        type: Sequelize.DECIMAL(2)
      },
      d_scb: {
        type: Sequelize.DECIMAL(2)
      },
      d_scv: {
        type: Sequelize.DECIMAL(2)
      },
      d_scg: {
        type: Sequelize.DECIMAL(2)
      },
      i_lcb: {
        type: Sequelize.DECIMAL(2)
      },
      i_lcv: {
        type: Sequelize.DECIMAL(2)
      },
      i_lcg: {
        type: Sequelize.DECIMAL(2)
      },
      i_mcb: {
        type: Sequelize.DECIMAL(2)
      },
      i_mcv: {
        type: Sequelize.DECIMAL(2)
      },
      i_mcg: {
        type: Sequelize.DECIMAL(2)
      },
      i_scb: {
        type: Sequelize.DECIMAL(2)
      },
      i_scv: {
        type: Sequelize.DECIMAL(2)
      },
      i_scg: {
        type: Sequelize.DECIMAL(2)
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
    return queryInterface.dropTable('Stocks');
  }
};