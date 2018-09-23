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
      d_lcb: {
        type: Sequelize.JSON
      },
      d_lcv: {
        type: Sequelize.JSON
      },
      d_lcg: {
        type: Sequelize.JSON
      },
      d_mcb: {
        type: Sequelize.JSON
      },
      d_mcv: {
        type: Sequelize.JSON
      },
      d_mcg: {
        type: Sequelize.JSON
      },
      d_scb: {
        type: Sequelize.JSON
      },
      d_scv: {
        type: Sequelize.JSON
      },
      d_scg: {
        type: Sequelize.JSON
      },
      i_lcb: {
        type: Sequelize.JSON
      },
      i_lcv: {
        type: Sequelize.JSON
      },
      i_lcg: {
        type: Sequelize.JSON
      },
      i_mcb: {
        type: Sequelize.JSON
      },
      i_mcv: {
        type: Sequelize.JSON
      },
      i_mcg: {
        type: Sequelize.JSON
      },
      i_scb: {
        type: Sequelize.JSON
      },
      i_scv: {
        type: Sequelize.JSON
      },
      i_scg: {
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