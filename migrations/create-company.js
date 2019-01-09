'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company', {
      com_regno: {
        type: Sequelize.CHAR,
        primaryKey: true,
        allowNull: false
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
      bizplace_code: {
        type: Sequelize.CHAR
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('company');
  }
};