'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dti_status', {

      conversation_id: {
        type: Sequelize.CHAR(35),
        primaryKey: true,
        allowNull: false,
      },
      supbuy_type: {
        type: Sequelize.CHAR(2),
        primaryKey: true,
        allowNull: false,
      },
      direction: {
        type: Sequelize.CHAR(1),
        primaryKey: true,
        allowNull: false,
      },
      dti_status: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      return_code: {
        type: Sequelize.CHAR
      },
      return_description: {
        type: Sequelize.STRING
      },
      sbdescription: {
        type: Sequelize.STRING
      },
      dept_name: {
        type: Sequelize.STRING
      },
      created_by: {
        type: Sequelize.STRING
      },
      last_updated_by: {
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

    queryInterface.addConstraint('dti_status', ['conversation_id', 'supbuy_type', 'direction'], {
      type: 'primaryKey',
      name: 'dti_status_pk'
    });
    // queryInterface.addConstraint('dti_status', ['conversation_id', 'supbuy_type', 'direction'], {
    //   type: 'foreign key',
    //   name: 'dti_status_fk',
    //   references: { //Required field
    //     table: 'dti_main'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dti_status');
  }
};
