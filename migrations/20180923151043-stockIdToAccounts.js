'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'accounts',
      'stocksId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'stocks',
          key: 'id'
        },
        allowNull: true
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('accounts', 'stocksId');

  }
};
