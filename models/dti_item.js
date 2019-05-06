'use strict';
module.exports = (sequelize, DataTypes) => {
  var dti_item = sequelize.define('dti_item', {
    id: {
      type: DataTypes.BIGINT(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    conversation_id: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true
    },
    supbuy_type: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true
    },
    direction: {
      type: DataTypes.CHAR,
      allowNull: false,
      primaryKey: true
    },
    dti_line_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    item_code: {
      type: DataTypes.STRING
    },
    item_name: {
      type: DataTypes.STRING
    },
    item_size: {
      type: DataTypes.STRING
    },
    item_md: {
      type: DataTypes.DATE
    },
    unit_price: {
      type: DataTypes.INTEGER
    },
    item_qty: {
      type: DataTypes.INTEGER
    },
    sup_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tax_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foreign_amount: {
      type: DataTypes.INTEGER
    },
    currency_code: {
      type: DataTypes.STRING
    },
    item_gubun: {
      type: DataTypes.STRING
    },
    remark: {
      type: DataTypes.STRING
    },
    created_by: {
      type: DataTypes.DATE
    },
    last_updated_by: {
      type: DataTypes.DATE
    }
  },
  {
    freezeTableName : true
  }
);
  // dti_item.associate = function(models) {
  //   dti_item.belongsTo(models.dti_main, {
  //     foreignKey : 'conversation_id',
  //     targetKey : 'conversation_id'
  //   });
  // };
  return dti_item;
};
