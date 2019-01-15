'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      com_regno: {
        type: Sequelize.CHAR(13),
        allowNull: false,
        primaryKey: true
      },
      bizCode: {
        type: Sequelize.CHAR(4),
        primaryKey: true
      },
      user_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      dept_name: {
        type: Sequelize.STRING
      },
      tel_num: {
        type: Sequelize.STRING
      },
      sbid: {
        type: Sequelize.STRING
      },
      sbpass: {
        type: Sequelize.STRING
      },
      token: {
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
    queryInterface.addConstraint('user', ['com_regno', 'email'], {
      type: 'primaryKey',
      name: 'user_pk'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  }
};