'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'accounts',
      'real_assetsId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'real_assets',
          key: 'id'
        },
        allowNull: true
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('accounts', 'real_assetsId');

  }
};
