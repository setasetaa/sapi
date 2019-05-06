'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('xxsb_dti_main', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20)
      },
      conversation_id: {
        type: Sequelize.CHAR(35),
        allowNull: false,
        unique: 'main_unique'
      },
      supbuy_type: {
        type: Sequelize.CHAR(2),
        allowNull: false,
        unique: 'main_unique'
      },
      direction: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        unique: 'main_unique'
      },
      dti_wdate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dti_idate: {
        type: Sequelize.DATE
      },
      dti_sdate: {
        type: Sequelize.DATE
      },
      dti_type: {
        type: Sequelize.STRING(4),
        allowNull: false,
      },
      tax_demand: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      issue_id: {
        type: Sequelize.STRING(24),
      },
      seq_id: {
        type: Sequelize.STRING(24)
      },
      invoice_num: {
        type: Sequelize.STRING
      },
      sup_com_id: {
        type: Sequelize.STRING(12)
      },
      sup_com_regno: {
        type: Sequelize.CHAR(13),
        allowNull: false,
      },
      sup_rep_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      sup_com_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      sup_com_type: {
        type: Sequelize.STRING(200)
      },
      sup_com_classify: {
        type: Sequelize.STRING(200)
      },
      sup_com_addr: {
        type: Sequelize.STRING(400),
        allowNull: false,
      },
      sup_dept_name: {
        type: Sequelize.STRING(200)
      },
      sup_emp_name: {
        type: Sequelize.STRING(200),
      },
      sup_tel_num: {
        type: Sequelize.STRING(200),
      },
      sup_email: {
        type: Sequelize.STRING(200),
      },
      byr_com_id: {
        type: Sequelize.STRING(12)
      },
      byr_com_regno: {
        type: Sequelize.CHAR(13),
        allowNull: false,
      },
      byr_rep_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      byr_com_name: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      byr_com_type: {
        type: Sequelize.STRING(200),
      },
      byr_com_classify: {
        type: Sequelize.STRING(200),
      },
      byr_com_addr: {
        type: Sequelize.STRING(400),
        allowNull: false,
      },
      byr_dept_name: {
        type: Sequelize.STRING(200)
      },
      byr_emp_name: {
        type: Sequelize.STRING(200),
      },
      byr_tel_num: {
        type: Sequelize.STRING(200),
      },
      byr_email: {
        type: Sequelize.STRING(200),
      },
      broker_com_id: {
        type: Sequelize.STRING(12),
      },
      broker_com_regno: {
        type: Sequelize.CHAR(13),
      },
      broker_rep_name: {
        type: Sequelize.STRING(200),
      },
      broker_com_name: {
        type: Sequelize.STRING(200),
      },
      broker_com_type: {
        type: Sequelize.STRING(200),
      },
      broker_com_classify: {
        type: Sequelize.STRING(200),
      },
      broker_com_addr: {
        type: Sequelize.STRING(400),
      },
      broker_dept_name: {
        type: Sequelize.STRING(200)
      },
      broker_emp_name: {
        type: Sequelize.STRING(200),
      },
      broker_tel_num: {
        type: Sequelize.STRING(200),
      },
      broker_email: {
        type: Sequelize.STRING(200),
      },
      sup_amount: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
      },
      tax_amount: {
        type: Sequelize.INTEGER(20)
      },
      total_amount: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
      },
      dti_msg: {
        type: Sequelize.TEXT,
      },
      amend_code: {
        type: Sequelize.STRING(2),
      },
      ori_issue_id: {
        type: Sequelize.STRING(24),
      },
      remark: {
        type: Sequelize.STRING(200),
      },
      remark2: {
        type: Sequelize.STRING(200),
      },
      remark3: {
        type: Sequelize.STRING(200),
      },
      EXCHANGED_DOC_ID: {
        type: Sequelize.STRING(200),
      },
      SUP_BIZPLACE_CODE: {
        type: Sequelize.STRING(4),
      },
      BYR_BIZPLACE_CODE: {
        type: Sequelize.STRING(4),
      },
      BROKER_BIZPLACE_CODE: {
        type: Sequelize.STRING(4),
      },
      byr_dept_name2: {
        type: Sequelize.STRING(200),
      },
      byr_emp_name2: {
        type: Sequelize.STRING(200),
      },
      byr_tel_num2: {
        type: Sequelize.STRING(200),
      },
      byr_email2: {
        type: Sequelize.STRING(200),
      },
      attachfile_yn: {
        type: Sequelize.CHAR(1),
      },
      dtt_yn: {
        type: Sequelize.CHAR(1),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      uniqueKeys: {
        main_unique: {
            fields: ['conversation_id', 'supbuy_type', 'direction']
        }
      }
    });
    // queryInterface.addConstraint('xxsb_dti_main', ['conversation_id', 'supbuy_type', 'direction'], {
    //   type: 'primaryKey',
    //   name: 'dti_main_pk'
    // });
    // dti_main.hasOne(models.dti_status, {foreignKey: 'fk_status', targetKey: 'conversation_id'});
    // dti_main.hasMany(models.dti_item, {foreignKey: 'fk_item', targetKey: 'conversation_id'});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('xxsb_dti_main');
  }
};
