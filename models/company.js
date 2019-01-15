'use strict';
module.exports = (sequelize, DataTypes) => {
  var company = sequelize.define('company', {
    com_regno: {
      type: DataTypes.CHAR(13),
      allowNull: false,
      primaryKey: true
    },
    bizplace_code: {
      type: DataTypes.CHAR(4),
      primaryKey: true
    },
    com_name: DataTypes.STRING,
    rep_name: DataTypes.STRING,
    addr: DataTypes.STRING,
    type: DataTypes.STRING,
    classify: DataTypes.STRING,
    code: DataTypes.STRING
  }, 
  {
    freezeTableName : true
  });
  company.associate = function(models) {
    // associations can be defined here
  };
  return company;
};