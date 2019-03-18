const express = require('express');
const models = require('../models');
const router = express.Router();
const request = require('request');
const storage = require('sessionstorage');

API_Call_Info = function(type, token, callback) {
  const PORT = '80';
  const BASE_PATH = '/api/user/me';
  var HOST = 'http://localhost';
  var OPTIONS = {
      headers: {'Authorization': type + ' ' + token},
      url: HOST + ':' + PORT + BASE_PATH
  };
  request.get(OPTIONS, function (err, res, result) {
    callback(result);
  });
};

router.get('/', function(req, res, next) {
  let token = storage.getItem('accessToken');
  let type = storage.getItem('tokenType');
  //console.log("token == " + token);
  if(token != null && type != null){
    API_Call_Info(type, token, function(response){
      console.log(JSON.parse(response));
      // storage.setItem('username', JSON.parse(response).username);
      // storage.setItem('name', JSON.parse(response).name);
      // storage.setItem('email', JSON.parse(response).email);
      // storage.setItem('telnum', JSON.parse(response).telnum);
      // storage.setItem('deptname', JSON.parse(response).deptname);
      // storage.setItem('token', JSON.parse(response).token);
      // storage.setItem('comregno', JSON.parse(response).comregno);
      // storage.setItem('bizcode', JSON.parse(response).bizcode);
      req.session.username = JSON.parse(response).username;
      req.session.name = JSON.parse(response).name;
      req.session.email = JSON.parse(response).email;
      req.session.telNum = JSON.parse(response).telnum;
      req.session.deptname = JSON.parse(response).deptname;
      req.session.token = JSON.parse(response).token;
      req.session.comregno = JSON.parse(response).comregno;
      req.session.bizcode = JSON.parse(response).bizcode;
      req.session.comName = JSON.parse(response).comname;
      req.session.comAddr = JSON.parse(response).addr;
      req.session.repName = JSON.parse(response).repname;
      req.session.comType = JSON.parse(response).comtype;
      req.session.comClassify = JSON.parse(response).classify;
      req.session.code = JSON.parse(response).code;
      if(response != null){
        console.log(JSON.parse(response).username);
        res.render("index", {session : req.session});
      }else{
        storage.clear();
        req.session.destroy();
        res.render("user/login");
      }
    });
  }else{
    storage.clear();
    req.session.destroy();
    res.render("user/login");
  }

});

module.exports = router;