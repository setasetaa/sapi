'use strict';
module.exports = (sequelize, DataTypes) => {
  var dti_main = sequelize.define('dti_main', {
    id: {
      type: DataTypes.BIGINT(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    conversation_id: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    supbuy_type: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    direction: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    dti_wdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    dti_idate: {
      type: DataTypes.DATE
    },
    dti_sdate: {
      type: DataTypes.DATE
    },
    dti_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tax_demand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    issue_id: {
      type: DataTypes.STRING
    },
    seq_id: {
      type: DataTypes.STRING,
    },
    invoice_num: DataTypes.STRING,
    sup_com_id: DataTypes.STRING,
    sup_com_regno: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    sup_rep_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sup_com_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sup_com_type: {
      type: DataTypes.STRING
    },
    sup_com_classify: {
      type: DataTypes.STRING
    },
    sup_com_addr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sup_dept_name: {
      type: DataTypes.STRING
    },
    sup_emp_name: DataTypes.STRING,
    sup_tel_num: DataTypes.STRING,
    sup_email: DataTypes.STRING,
    byr_com_id: DataTypes.STRING,
    byr_com_regno: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    byr_rep_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    byr_com_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    byr_com_type: {
      type: DataTypes.STRING
    },
    byr_com_classify: {
      type: DataTypes.STRING
    },
    byr_com_addr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    byr_dept_name: DataTypes.STRING,
    byr_emp_name: DataTypes.STRING,
    byr_tel_num: DataTypes.STRING,
    byr_email: {
      type: DataTypes.STRING
    },
    broker_com_id: DataTypes.STRING,
    broker_com_regno: {
      type: DataTypes.STRING
    },
    broker_rep_name: {
      type: DataTypes.STRING
    },
    broker_com_name: {
      type: DataTypes.STRING
    },
    broker_com_type: {
      type: DataTypes.STRING
    },
    broker_com_classify: {
      type: DataTypes.STRING
    },
    broker_com_addr: {
      type: DataTypes.STRING
    },
    broker_dept_name: DataTypes.STRING,
    broker_emp_name: DataTypes.STRING,
    broker_tel_num: DataTypes.STRING,
    broker_email: {
      type: DataTypes.STRING
    },
    sup_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tax_amount: {
      type: DataTypes.INTEGER
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dti_msg: DataTypes.TEXT,
    amend_code: DataTypes.STRING,
    ori_issue_id: DataTypes.STRING,
    remark: DataTypes.STRING,
    remark2: DataTypes.STRING,
    remark3: DataTypes.STRING,
    exchanged_doc_id: DataTypes.STRING,
    sup_bizplace_code: DataTypes.STRING,
    byr_bizplace_code: DataTypes.STRING,
    broker_bizplace_code: DataTypes.STRING,
    byr_dept_name2: DataTypes.STRING,
    byr_emp_name2: DataTypes.STRING,
    byr_tel_num2: DataTypes.STRING,
    byr_email2: DataTypes.STRING,
    attachfile_yn: DataTypes.CHAR,
    dtt_yn: DataTypes.CHAR
  },
  {
    freezeTableName : true,
  });
  // dti_main.associate = function(models) {
  //    dti_main.hasOne(models.dti_status, {foreignKey : 'conversation_id'});
  //    dti_main.hasMany(models.dti_item, {foreignKey : 'conversation_id'});

  // };
  return dti_main;
};
