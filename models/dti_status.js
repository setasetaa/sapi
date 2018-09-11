'use strict';
module.exports = (sequelize, DataTypes) => {
  var dti_status = sequelize.define('dti_status', {
    conversation_id: {
      type: DataTypes.CHAR(35),
      allowNull: false,
      primaryKey: true
    },
    supbuy_type: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true
    },
    direction: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      primaryKey: true
    },
    dti_status: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    return_code: DataTypes.CHAR,
    return_description: DataTypes.STRING,
    sbdescription: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    created_by: DataTypes.STRING,
    last_updated_by: DataTypes.STRING
  },
  {
    freezeTableName : true
  });
  dti_status.associate = function(models) {
    dti_status.belongsTo(models.dti_main, {
      foreignKey : 'conversation_id',
      targetKey : 'conversation_id'
    });
  };
  return dti_status;
};
