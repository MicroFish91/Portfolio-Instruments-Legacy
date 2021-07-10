'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'fixed_incomes',
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
    
    return queryInterface.removeColumn('real_assets', 'accountId');
    
  }
};
