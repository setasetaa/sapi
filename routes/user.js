const express = require('express');
const router = express.Router();
const models = require("../models");
const request = require('request');
const storage = require('sessionstorage');

API_Call_Confirm = function(func, data, callback) {
  const PORT = '80';
  const BASE_PATH = '/api/auth';
  var HOST = 'http://localhost';
  var OPTIONS = {
      headers: {'Content-Type': 'application/json'},
      url: HOST + ':' + PORT + BASE_PATH + '/' + func,
      body: data
  };
  request.post(OPTIONS, function (err, res, result) {
    callback(result);
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
  API_Call_Confirm("signup", JSON.stringify(body), function(response){
    let result = response;
    //console.log(response);
    let t = JSON.parse(result).success;
    let message = JSON.parse(result).message;
    if(t){
      res.redirect("/");
    }else{
      res.status(401).send(message);
    }
  });
});

router.get('/login', function(req, res, next) {
  res.redirect("/");
});

router.post("/login", function(req, res, next){
  let body = req.body;
  
  API_Call_Confirm("signin", JSON.stringify(body), function(response){
    console.log(response);
    let result = response;
    if(result != null){
      storage.setItem('accessToken', JSON.parse(result).accessToken);
      storage.setItem('tokenType', JSON.parse(result).tokenType);
      res.status(200).send();
    }else{
      res.status(401).send();
    }
  });
  
});

router.get("/logout", function(req,res,next){
  storage.clear();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;