const express = require('express');
const models = require('../models');
const router = express.Router();
const fs = require('fs');

router.get('/ARlist', function(req, res, next){
  res.render('dti/list/ARlist', {session : req.session});
});

router.get('/APlist', function(req, res, next){
  res.render('dti/list/APlist', {session : req.session});
});

router.post('/list', function(req, res, next) {
  let body = req.body;
  console.log(body);
  var search = {};
  var join = {};
  var where = {};
  var dateType, fromDate, endDate, regno, comName, supAmount, taxAmount, issueID, dtiType, direction, dtiStatus, taxDemand, sbType;

  for(var i = 0; i < body.length; i++){
    var searchType = body[i].name;
    switch(searchType){
      case 'sbType' :
      sbType = body[i].value;
      break;
      case 'dateType' :
      dateType = body[i].value;
      break;
      case 'fromDate' :
      fromDate = body[i].value;
      break;
      case 'endDate' :
      endDate = body[i].value;
      break;
      case 'regno' :
      regno = body[i].value;
      break;
      case 'comName' :
      comName = body[i].value;
      break;
      case 'supAmount' :
      supAmount = body[i].value;
      break;
      case 'taxAmount' :
      taxAmount = body[i].value;
      break;
      case 'issueID' :
      issueID = body[i].value;
      break;
      case 'dtiType' :
      if(dtiType != undefined){
        dtiType = dtiType + body[i].value;
      }else{
        dtiType = body[i].value;
      }
      break;
      case 'direction' :
      if(direction != undefined){
        direction = direction + body[i].value;
      }else{
        direction = body[i].value;
      }
      break;
      case 'dtiStatus' :
      if(dtiStatus != undefined){
        dtiStatus = dtiStatus + body[i].value;
      }else{
        dtiStatus = body[i].value;
      }
      break;
      case 'taxDemand' :
      if(taxDemand != undefined){
        taxDemand = taxDemand + body[i].value;
      }else{
        taxDemand = body[i].value;
      }
      break;
    }
  }
  where['supbuy_Type'] = sbType;
  if(dateType != "" && dateType != null){
    where[dateType] = {$between: [fromDate, endDate]};
  }
  if(regno != "" && regno != null){
    regno = regno.replace('-','');
    if('AP' == sbType){
      where['sup_com_regno'] = regno;
    }else{
      where['byr_com_regno'] = regno;
    }
  }
  if(comName != "" && comName != null){
    if('AP' == sbType){
      where['sup_com_name'] = {$like: comName + '%'};
    }else{
      where['byr_com_name'] = {$like: comName + '%'};
    }
  }
  if(supAmount != "" && supAmount != null){
    where['sup_amount'] = supAmount;
  }
  if(taxAmount != "" && taxAmount != null){
    where['tax_amount'] = taxAmount;
  }
  if(issueID != "" && issueID != null){
    where['issue_id'] = issueID;
  }
  if(dtiType != "" && dtiType != null){
    var temp = [];

    if(dtiType.indexOf('과세') != -1){
      temp = temp.concat('0101', '0102', '0103', '0104', '0105', '0201', '0202', '0203', '0204', '0205');
    }
    if(dtiType.indexOf('면세') != -1){
      temp = temp.concat('0301', '0303', '0304', '0401', '0403', '0404');
    }
    if(dtiType.indexOf('수정') != -1){
      temp = temp.concat('0201', '0202', '0203', '0204', '0205', '0401', '0403', '0404');
    }
    if(dtiType.indexOf('위수탁') != -1){
      temp = temp.concat('0103', '0105', '0203', '0205', '0303', '0403');
    }
    var value = temp.toString().split(',');
    var uniqArray = Array.from(new Set(value));
    where['dti_type'] = [uniqArray];
    
  }
  if(direction != "" && direction != null){
    var temp = [];
    
    if(direction.indexOf('1') != -1){
      temp = temp.concat('1');
    }
    if(direction.indexOf('2') != -1){
      temp = temp.concat('2');
    }
    var value = temp.toString().split(',');
    where['direction'] = [value];
    
  }
  if(dtiStatus != "" && dtiStatus != null){
    var temp = [];
    if(dtiStatus.indexOf('S') != -1){
      temp = temp.concat('S');
    }
    if(dtiStatus.indexOf('I') != -1){
      temp = temp.concat('I');
    }
    if(dtiStatus.indexOf('C') != -1){
      temp = temp.concat('C');
    }
    if(dtiStatus.indexOf('R') != -1){
      temp = temp.concat('R');
    }
    if(dtiStatus.indexOf('T') != -1){
      temp = temp.concat('T');
    }
    if(dtiStatus.indexOf('O') != -1){
      temp = temp.concat('O');
    }
    if(dtiStatus.indexOf('V') != -1){
      temp = temp.concat('V');
    }
    if(dtiStatus.indexOf('W') != -1){
      temp = temp.concat('W');
    }
    var value = temp.toString().split(',');
    //where['dti_status'] = [value];
    join['where'] = {'dti_status': [value] };
    
  }
  if(taxDemand != "" && taxDemand != null){
    var temp = [];
    if(taxDemand.indexOf('01') != -1){
      temp = temp.concat('01');
    }
    if(taxDemand.indexOf('02') != -1){
      temp = temp.concat('02');
    }
    var value = temp.toString().split(',');
    where['tax_demand'] = [value];
    
  }
  if(Object.keys(where).length > 0){
    search.where = where;
  }
  join['model'] = models.dti_status;
  search.include = [];
  search.include[0] = join;
  join = {};
  join['model'] = models.dti_item;
  search.include[1] = join;
  models.dti_main.findAll(search)
  .then(function(data){
    if(data.length != 0){
      //console.log("select data!!!!!!!" + data);
      res.send({result:true, data:data});
    }else{
      res.send({result:true, msg:"no data"});
    }
  }).catch(function(err){
    res.send({result:false, msg:"fail"});
  });
});

router.post('/save', function(req, res, next) {
  console.log("data save");
  let body = req.body;
  var t;
  console.log(body);
  models.sequelize.transaction().then(function(transaction){
    t = transaction;
    models.dti_main.create({
      dti_msg : body.dtiMSG,
      conversation_id : body.conversationID,
      supbuy_type : body.supbuyType,
      direction : body.direction,
      dti_wdate : body.WDate,
      dti_idate : body.IDate,
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
      sup_dept_name : body.supDeptName,
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
      byr_dept_name : body.byrDeptName,
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
      broker_dept_name : body.brkDeptName,
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
        for(var i =0; i < body.itemCount; i++){
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
    res.send({result:true, msg:"suc"});
  }).catch(function(err){
    if(t)
    t.rollback();
    res.send({result:false, msg:"fail"});
  });
});

router.post('/updateStatus', function(req, res, next) {
  let conversationID = req.body.conversationID;
  let supbuyType = req.body.supbuyType;
  let signal = req.body.signal;
  let reason = req.body.reason;
  var status;
  //console.log(signal);
  switch(signal){
    case 'APPROVE':
    status = 'C';
    break;
    case 'REJECT':
    status = 'T';
    break;
    case 'CANCELRREQUEST':
    status = 'W';
    break;
    case 'RIREJECT':
    status = 'R';
    break;
    case 'CANCELALL':
    status = 'O';
    break;
  }
  //console.log(status+reason+conversationID);
  models.dti_status.update({
      dti_status : status,
      sbdescription : reason
  },{
      where: {conversation_id: conversationID, supbuyType: supbuyType}
  })
  .then( result => {
      console.log("데이터 수정 완료");
      res.render("dti/list/APlist");
  })
  .catch( err => {
      console.log("데이터 수정 실패");
  });
});

router.post('/renewStatus', function(req, res, next) {
  let conversationID = req.body.conversationID;
  let supbuyType = req.body.supbuyType;
  let issueID = req.body.issueID;
  let status = req.body.status;
  let ntsStatus = req.body.NTSstatus;
  let ntsCode = req.body.NTSCode;
  let dtiIdate = req.body.dtiIdate;
  let dtiSdate = req.body.dtiSdate;
  console.log(dtiSdate);
  var t;
  models.sequelize.transaction().then(function(transaction){
    t = transaction;
    models.dti_status.update({
      dti_status : status,
      send_request : ntsStatus,
      result_request : ntsCode
    },
    {
      where: {conversation_id: conversationID, supbuyType: supbuyType}
    }).then( result => {
      models.dti_main.update({
        issue_id : issueID,
        dti_idate : dtiIdate,
        dti_sdate : dtiSdate
      },
      {
        where: {conversation_id: conversationID, supbuyType: supbuyType}
      });
    });
  }).then(function(result) {
    t.commit();
    console.log("데이터 수정 완료");
  }).catch(function(err){
    if(t)
    t.rollback();
    console.log(err);
  });
});

// 검증 전
router.post('/delete', function(req, res, next) {
  console.log("data delete");
  let body = req.body;
  var t;
  models.sequelize.transaction().then(function(transaction){
    t = transaction;
    models.dti_status.destroy({ 
      where: {conversation_id: conversationID, supbuyType: supbuyType}
    }).then( result => {
      models.dti_item.destroy({ 
        where: {conversation_id: conversationID, supbuyType: supbuyType}
      }).then( result => {
        models.dti_main.destroy({ 
          where: {conversation_id: conversationID, supbuyType: supbuyType}
        });
      });
    });
  }).then(function(result) {
    t.commit();
    console.log("삭제 완료");
    res.send({result:true, msg:"suc"});
  }).catch(function(err){
    if(t)
    t.rollback();
    res.send({result:false, msg:"fail"});
  });
});

router.post('/getXML', function(req, res, next) {
  var viewData;
  var supbuyType = req.body.supbuyType;
  var dtiType = req.body.dtiType;
  //console.log(supbuyType+'~~~'+dtiType);
  models.dti_main.findAll({
    attributes : ['dti_msg'],
    where : {conversation_id : req.body.conversationID}}
  ).then(function(data){
    //console.log("======length"+data.length);
    if(data.length != 0){
      if(dtiType == '0101' || dtiType == '0102' || dtiType == '0102' || dtiType == '0201' || dtiType == '0202' || dtiType == '0104' || dtiType == '0204'){
        if(supbuyType == 'AR'){
          viewData = fs.readFileSync('views/dti/list/viewForm/AR01.xsl', 'utf-8');
        }else{
          viewData = fs.readFileSync('views/dti/list/viewForm/AP01.xsl', 'utf-8');
        }
      }else if(dtiType == '0301' || dtiType == '0304' || dtiType == '0401' || dtiType == '0404'){
        if(supbuyType == 'AR'){
          viewData = fs.readFileSync('views/dti/list/viewForm/AR02.xsl', 'utf-8');
        }else{
          viewData = fs.readFileSync('views/dti/list/viewForm/AP02.xsl', 'utf-8');
        }
      }else if(dtiType == '0103' || dtiType == '0105' || dtiType == '0203' || dtiType == '0205'){
        if(supbuyType == 'AR'){
          viewData = fs.readFileSync('views/dti/list/viewForm/AR03.xsl', 'utf-8');
        }else{
          viewData = fs.readFileSync('views/dti/list/viewForm/AP03.xsl', 'utf-8');
        }
      }else if(dtiType == '0303' || dtiType == '0403'){
        if(supbuyType == 'AR'){
          viewData = fs.readFileSync('views/dti/list/viewForm/AR04.xsl', 'utf-8');
        }else{
          viewData = fs.readFileSync('views/dti/list/viewForm/AP04.xsl', 'utf-8');
        }
      }
      //console.log(data);
      res.send({result:true, xml:data, html:viewData});
      }else{
        res.send({result:true, msg:"no data"});
      }
    }).catch(function(err){
      console.log(err);
      res.send({result:false, msg:"fail"});
    });
});


module.exports = router;
