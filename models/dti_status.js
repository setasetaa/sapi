'use strict';
module.exports = (sequelize, DataTypes) => {
  var dti_status = sequelize.define('dti_status', {
    id: {
      type: DataTypes.BIGINT(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
    dti_status: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    return_code: DataTypes.CHAR,
    return_description: DataTypes.STRING,
    sbdescription: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    created_by: DataTypes.STRING,
    last_updated_by: DataTypes.STRING,
    send_request : DataTypes.STRING,
    send_request_desc : DataTypes.STRING,
    result_request : DataTypes.STRING,
    error_msg : DataTypes.STRING
  },
  {
    freezeTableName : true
  });
  // dti_status.associate = function(models) {
  //   dti_status.belongsTo(models.dti_main, {
  //     foreignKey : 'conversation_id',
  //     targetKey : 'conversation_id'
  //   });
  // };
  return dti_status;
};
