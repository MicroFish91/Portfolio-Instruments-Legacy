'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('snapshots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(30)
      },
      portfolioBenchmark: {
        type: Sequelize.STRING(30)
      },
      stockTotal: {
        type: Sequelize.DECIMAL
      },
      fixedTotal: {
        type: Sequelize.DECIMAL
      },
      realTotal: {
        type: Sequelize.DECIMAL
      },
      cashTotal: {
        type: Sequelize.DECIMAL
      },
      date: {
        type: Sequelize.DATE
      },
      notes: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('snapshots');
  }
};