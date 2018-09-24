'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'accounts',
      'snapshotId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'snapshots',
          key: 'id'
        },
        allowNull: false
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('accounts', 'snapshotId');
    
  }
};
