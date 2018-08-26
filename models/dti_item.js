'use strict';
module.exports = (sequelize, DataTypes) => {
  var dti_item = sequelize.define('dti_item', {
    conversation_id: {
      type: DataTypes.CHAR(35),
      allowNull: false,
      primaryKey: true,
    },
    supbuy_type: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true,
    },
    direction: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true,
    },
    dti_line_num: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
    },
    item_code: {
      type: DataTypes.STRING,
    },
    item_name: {
      type: DataTypes.STRING,
    },
    item_size: {
      type: DataTypes.STRING,
    },
    item_md: {
      type: DataTypes.DATE,
    },
    unit_price: {
      type: DataTypes.INTEGER,
    },
    item_qty: {
      type: DataTypes.INTEGER,
    },
    sup_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foreign_amount: {
      type: DataTypes.INTEGER,
    },
    currency_code: {
      type: DataTypes.STRING,
    },
    item_gubun: {
      type: DataTypes.STRING,
    },
    remark: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    last_updated_by: {
      type: DataTypes.STRING
    }
  },
  {
    freezeTableName : true,
  });
  dti_item.associate = function(models) {
    dti_item.belongsTo(models.dti_main, {
      foreignKey : 'conversation_id',
      targetKey : 'conversation_id'
    });
    // dti_item.belongsTo(models.dti_main, {
    //   foreignKey : 'supbuy_type',
    //   targetKey : 'supbuy_type'
    // });
    // dti_item.belongsTo(models.dti_main, {
    //   foreignKey : 'direction',
    //   targetKey : 'direction'
    // });
  };
  return dti_item;
};
