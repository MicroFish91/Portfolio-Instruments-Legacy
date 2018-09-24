'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'real_assets',
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
