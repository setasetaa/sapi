'use strict';
module.exports = (sequelize, DataTypes) => {
  var dti_main = sequelize.define('dti_main', {
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
    dti_wdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dti_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tax_demand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    issue_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seq_id: {
      type: DataTypes.STRING,
    },
    invoice_num: DataTypes.STRING,
    sup_com_id: DataTypes.STRING,
    sup_com_regno: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    sup_rep_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sup_com_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sup_com_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sup_com_classify: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sup_com_addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sup_dept_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sup_emp_name: DataTypes.STRING,
    sup_tel_num: DataTypes.STRING,
    sup_email: DataTypes.STRING,
    byr_com_id: DataTypes.STRING,
    byr_com_regno: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    byr_rep_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    byr_com_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    byr_com_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    byr_com_classify: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    byr_com_addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    byr_dept_name: DataTypes.STRING,
    byr_emp_name: DataTypes.STRING,
    byr_tel_num: DataTypes.STRING,
    byr_email: {
      type: DataTypes.STRING,
    },
    broker_com_id: DataTypes.STRING,
    broker_com_regno: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    broker_rep_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broker_com_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broker_com_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broker_com_classify: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broker_com_addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    broker_dept_name: DataTypes.STRING,
    broker_emp_name: DataTypes.STRING,
    broker_tel_num: DataTypes.STRING,
    broker_email: {
      type: DataTypes.STRING,
    },
    sup_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dti_msg: DataTypes.BLOB,
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
  dti_main.associate = function(models) {
    dti_main.hasOne(models.dti_status);
    dti_main.hasMany(models.dti_item);
  };
  return dti_main;
};
