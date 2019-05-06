'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('xxsb_dti_status', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      conversation_id: {
        type: Sequelize.CHAR(35),
        allowNull: false,
        unique: 'status_unique'
      },
      supbuy_type: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        unique: 'status_unique'
      },
      direction: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        unique: 'status_unique'
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
      },
      uniqueKeys: {
        status_unique: {
            fields: ['conversation_id', 'supbuy_type', 'direction']
        }
      }
    });

    // queryInterface.addConstraint('xxsb_dti_status', ['conversation_id', 'supbuy_type', 'direction'], {
    //   type: 'primaryKey',
    //   name: 'dti_status_pk'
    // });

    //return queryInterface.sequelize.query("ALTER TABLE dti_status ADD CONSTRAINT FK_dti_status FOREIGN KEY(conversation_id, supbuy_type, direction)
    //REFERENCES dti_main (conversation_id, supbuy_type, direction);");

    },
    down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('xxsb_dti_status');
      return queryInterface.sequelize.query("ALTER TABLE dti_status DROP CONSTRAINT FK_dti_status;");
    }
 };
