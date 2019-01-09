'use strict';
module.exports = {
  up: function (queryInterface, Sequelize)  {
    return queryInterface.createTable('dti_item', {
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
      dti_line_num: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      item_code: {
        type: Sequelize.STRING,
      },
      item_name: {
        type: Sequelize.STRING,
      },
      item_size: {
        type: Sequelize.STRING,
      },
      item_md: {
        type: Sequelize.DATE,
      },
      unit_price: {
        type: Sequelize.INTEGER,
      },
      item_qty: {
        type: Sequelize.INTEGER,
      },
      sup_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tax_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      foreign_amount: {
        type: Sequelize.INTEGER,
      },
      currency_code: {
        type: Sequelize.STRING,
      },
      item_gubun: {
        type: Sequelize.STRING,
      },
      remark: {
        type: Sequelize.STRING,
      },
      created_by: {
        type: Sequelize.STRING,
      },
      last_updated_by: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    queryInterface.addConstraint('dti_item', ['conversation_id', 'supbuy_type', 'direction', 'dti_line_num'], {
      type: 'primaryKey',
      name: 'dti_item_pk'
    });

    //return queryInterface.sequelize.query("ALTER TABLE dti_item ADD CONSTRAINT FK_dti_item FOREIGN KEY(conversation_id, supbuy_type, direction)
    //REFERENCES dti_main (conversation_id, supbuy_type, direction);");
    // queryInterface.addConstraint('dti_item', ['conversation_id', 'supbuy_type', 'direction'], {
    //   type: 'foreignKey',
    //   name: 'dti_item_fk',
    // });
  },
  down: function (queryInterface, Sequelize){
    return queryInterface.dropTable('dti_item');
    return queryInterface.sequelize.query("ALTER TABLE dti_item DROP CONSTRAINT FK_dti_item;");
  }
};
