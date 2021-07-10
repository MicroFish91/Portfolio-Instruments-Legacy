'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn(
      'snapshots',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      }
    );

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('snapshots', 'userId');

  }
};
