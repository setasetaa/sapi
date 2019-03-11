'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      comregno: {
        type: Sequelize.CHAR(13),
        allowNull: false,
        primaryKey: true
      },
      bizcode: {
        type: Sequelize.CHAR(4),
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING
      },
      deptname: {
        type: Sequelize.STRING
      },
      telnum: {
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
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
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