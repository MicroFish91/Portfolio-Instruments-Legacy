'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.addColumn(
      'stocks',
      'accountId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'accounts',
          key: 'id'
        },
        allowNull: false
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('stocks', 'accountId');

  }
};
