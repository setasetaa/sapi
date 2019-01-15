'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    com_regno: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      primaryKey: true
    },
    bizCode: {
      type: DataTypes.CHAR(4),
      primaryKey: true
    },
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    tel_num: DataTypes.STRING,
    sbid: DataTypes.STRING,
    sbpass: DataTypes.STRING,
    token: DataTypes.STRING,
    
  }, 
  {
    freezeTableName : true,
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};