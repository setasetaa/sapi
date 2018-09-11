const express = require('express');
const models = require('../models');
const router = express.Router();
const crypto = require('crypto');
const sequelize = require('sequelize');
router.get('/APlist', function(req, res, next){
  res.render("dti/list/APlist");
});
router.post('/APlist', function(req, res, next) {
  let body = req.body;
  console.log(body);
  var search = {};
  var join = {};
  var where = {};
  var dateType = body[0].value;
  var fromDate = body[1].value;
  var endDate = body[2].value;
  var regno = body[3].value;
  var comName = body[4].value;
  var supAmount = body[5].value;
  var taxAmount = body[6].value;
  var issueID = body[7].value;
  console.log(fromDate);
  if(dateType != ""){
    //regno = regno.replace('-','');
    where[dateType] = {$between: [fromDate, endDate]};
  }

  if(regno != ""){
    //regno = regno.replace('-','');
    where['sup_com_regno'] = {regno};
  }
  if(comName != ""){
    //regno = regno.replace('-','');
    where['sup_com_name'] = {$like: comName + '%'};
  }
  if(supAmount != ""){
    //regno = regno.replace('-','');
    where['sup_amount'] = {supAmount};
  }
  if(taxAmount != ""){
    //regno = regno.replace('-','');
    where['tax_amount'] = {taxAmount};
  }
  if(issueID != ""){
    //regno = regno.replace('-','');
    where['issue_id'] = {issueID};
  }

  if(Object.keys(where).length > 0){
    search.where = where;
  }
  join['model'] = models.dti_status;
  //join['model'] = models.dti_item;
  search.include = join;
  models.dti_main.findAll(search)
  .then(function(data){
    if(data.length != 0){
      console.log("select data!!!!!!!"+JSON.stringify(data));
      res.render("dti/list/APlist",{data : JSON.stringify(data)});
    }else{
      res.render("dti/list/APlist");
    }
  });

});

router.post('/save', function(req, res, next) {
  console.log("data save");

  let body = req.body;
  var t;
  models.sequelize.transaction().then(function(transaction){
    t = transaction;
    models.dti_main.create({
      conversation_id : body.conversationID,
      supbuy_type : body.supbuyType,
      direction : body.direction,
      dti_wdate : body.WDate,
      dti_type : body.typeCode,
      tax_demand : body.taxDemand,
      issue_id : body.issueID,
      seq_id : body.seqId,
      invoice_num : "",
      sup_com_id : "",
      sup_com_regno : body.supComRegno,
      sup_rep_name : body.supRepName,
      sup_com_name : body.supComName,
      sup_com_type : body.supComType,
      sup_com_classify : body.supComClassify,
      sup_com_addr : body.supComAddr,
      sup_dept_name : "",
      sup_emp_name : body.supEmpName,
      sup_tel_num : body.supTelNum,
      sup_email : body.supEmail,
      sup_bizplace_code : body.supBizplaceCode,
      byr_com_id : "",
      byr_com_regno : body.byrComRegno,
      byr_rep_name : body.byrRepName,
      byr_com_name : body.byrComName,
      byr_com_type : body.byrComType,
      byr_com_classify : body.byrComClassify,
      byr_com_addr : body.byrComAddr,
      byr_dept_name : "",
      byr_emp_name : body.byrEmpName,
      byr_tel_num : body.byrTelNum,
      byr_email : body.byrEmail,
      byr_dept_name2 : "",
      byr_emp_name2 : "",
      byr_tel_num2 : "",
      byr_bizplace_code : body.byrBizplaceCode,
      broker_com_id : "",
      broker_com_regno : body.brkComRegno,
      broker_rep_name : body.brkRepName,
      broker_com_name : body.brkComName,
      broker_com_type : body.brkComType,
      broker_com_classify : body.brkComClassify,
      broker_com_addr : body.brkComAddr,
      broker_dept_name : "",
      broker_emp_name : body.brkEmpName,
      broker_tel_num : body.brkTelNum,
      broker_email : body.brkEmail,
      broker_bizplace_code : body.brkBizplaceCode,
      sup_amount : body.supAmount,
      tax_amount : body.taxAmount,
      total_amount : body.totalAmount,
      amend_code : body.amendCode,
      ori_issue_id : body.oriIssueId,
      remark : body.remark,
      remark2 : body.remark2,
      remark3 : body.remark3,
      exchanaged_doc_id : "",
      attachfile_yn : "",
      dtt_yn : ""
    })
    .then( result => {
        for(var i =0;i < body.itemCount; i++){
          models.dti_item.create({
            conversation_id : body.conversationID,
            supbuy_type : body.supbuyType,
            direction : body.direction,
            dti_line_num : body.itemLineNum[i],
            item_name : body.itemName[i],
            item_size : body.itemSize[i],
            item_md : body.itemMD[i],
            unit_price : body.itemUnitPrice[i],
            item_qty : body.itemQTY[i],
            sup_amount : body.itemSupAmount[i],
            tax_amount : body.itemTaxAmount[i],
            remark : body.itemRemark[i],
            item_gubun : "DTI"
          });
        }

        models.dti_status.create({
          conversation_id : body.conversationID,
          supbuy_type : body.supbuyType,
          direction : body.direction,
          dti_status : body.status
        });
        console.log("저장 완료");
    });
  }).then(function(result) {
    t.commit();
  }).catch(function(err){
    if(t)
    t.rollback();
  });

});















module.exports = router;
