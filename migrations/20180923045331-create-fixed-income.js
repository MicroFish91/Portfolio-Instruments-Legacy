'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Fixed_Incomes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ltb: {
        type: Sequelize.DECIMAL(2)
      },
      itb: {
        type: Sequelize.DECIMAL(2)
      },
      stb: {
        type: Sequelize.DECIMAL(2)
      },
      bills: {
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
    return queryInterface.dropTable('Fixed_Incomes');
  }
};