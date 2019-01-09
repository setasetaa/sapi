'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    com_regno: DataTypes.CHAR,
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    dept_name: DataTypes.STRING,
    sbid: DataTypes.STRING,
    sbpass: DataTypes.STRING,
    token: DataTypes.STRING
  }, 
  {
    freezeTableName : true,
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};