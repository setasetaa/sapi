'use strict';
module.exports = (sequelize, DataTypes) => {
  var company = sequelize.define('company', {
    com_regno: DataTypes.CHAR,
    com_name: DataTypes.STRING,
    rep_name: DataTypes.STRING,
    addr: DataTypes.STRING,
    type: DataTypes.STRING,
    classify: DataTypes.STRING,
    bizplace_code: DataTypes.CHAR,
    code: DataTypes.STRING
  }, 
  {
    freezeTableName : true,
  });
  company.associate = function(models) {
    // associations can be defined here
  };
  return company;
};