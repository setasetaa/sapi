'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    comregno: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      primaryKey: true
    },
    bizcode: {
      type: DataTypes.CHAR(4),
      primaryKey: true
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    deptname: DataTypes.STRING,
    telnum: DataTypes.STRING,
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