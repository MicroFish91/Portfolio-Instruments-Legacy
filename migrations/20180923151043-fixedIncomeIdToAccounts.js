'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'accounts',
      'fixed_incomesId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'fixed_incomes',
          key: 'id'
        },
        allowNull: true
      }
    );
    
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('accounts', 'fixed_incomesId');

  }
};
