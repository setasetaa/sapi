'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company', {
      com_regno: {
        type: Sequelize.CHAR(13),
        allowNull: false,
        primaryKey: true
      },
      bizplace_code: {
        type: Sequelize.CHAR(4),
        primaryKey: true
      },
      com_name: {
        type: Sequelize.STRING
      },
      rep_name: {
        type: Sequelize.STRING
      },
      addr: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      classify: {
        type: Sequelize.STRING
      },
      code: {
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
    queryInterface.addConstraint('company', ['com_regno', 'bizplace_code'], {
      type: 'primaryKey',
      name: 'company_pk'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('company');
  }
};