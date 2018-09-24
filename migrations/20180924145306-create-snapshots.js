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
      stockTotal: {
        type: Sequelize.DECIMAL
      },
      fixedIncomeTotal: {
        type: Sequelize.DECIMAL
      },
      cashTotal: {
        type: Sequelize.DECIMAL
      },
      commodotiesTotal: {
        type: Sequelize.DECIMAL
      },
      weightedER: {
        type: Sequelize.DECIMAL
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