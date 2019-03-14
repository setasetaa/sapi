const express = require('express');
const router = express.Router();
const models = require("../models");
const request = require('request');
const storage = require('sessionstorage');

API_Call = function(func, data, callback) {
  const PORT = '80';
  const BASE_PATH = '/api/auth';
  var HOST = 'http://localhost';
  var OPTIONS = {
      headers: {'Content-Type': 'application/json'},
      url: HOST + ':' + PORT + BASE_PATH + '/' + func,
      body: data
  };
  var res;
  request.post(OPTIONS, function (err, res, result) {
    
    if('signin' == func){
      storage.setItem('accessToken', JSON.parse(result).accessToken);
      storage.setItem('tokenType', JSON.parse(result).tokenType);
    }else{
      storage.setItem('success', JSON.parse(result).success);
      storage.setItem('message', JSON.parse(result).message);
    }
    res = result;
    //console.log(res);
    callback(res);
  });
  
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(storage.getItem('accessToken') != null){
    res.redirect("/");
  }else{
    res.render("user/login");
  }
});

router.get('/register', function(req, res, next){
  res.render("user/register");
});

router.post("/register", function(req, res, next){
  let body = req.body;
  API_Call("signup", JSON.stringify(body), function(response){
    //console.log(response);
    let result = storage.getItem('success');
    let message = storage.getItem('message');
    if(result){
      res.redirect("/");
    }else{
      res.status(401).send();
    }
  });
});

router.get('/login', function(req, res, next) {
  res.redirect("/");
});

router.post("/login", function(req, res, next){
  let body = req.body;
  
  API_Call("signin", JSON.stringify(body), function(response){
    //console.log(response);
    let result = JSON.parse(response).accessToken;
    if(result != null){
      res.status(200).send();
    }else{
      res.status(401).send();
    }
  });
  
});

router.get("/logout", function(req,res,next){
  storage.clear();
  res.redirect("/");
});

module.exports = router;