const express = require('express');
const router = express.Router();
const models = require("../models");
const request = require('request');
const storage = require('sessionstorage');

function API_Call(func, data) {
  const PORT = '80';
  const BASE_PATH = '/api/auth';
  var HOST = 'http://localhost';
  var OPTIONS = {
      headers: {'Content-Type': 'application/json'},
      url: HOST + ':' + PORT + BASE_PATH + '/' + func,
      body: data
  };

  request.post(OPTIONS, function (err, res, result) {
    if('signin' == func){
      storage.setItem('accessToken', JSON.parse(result).accessToken);
      storage.setItem('tokenType', JSON.parse(result).tokenType);
    }else{
      storage.setItem('success', JSON.parse(result).success);
      storage.setItem('message', JSON.parse(result).message);
    }
    //console.log(storage.getItem('accessToken'));
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
  API_Call("signup", JSON.stringify(body));
  let result = storage.getItem('success');
  let message = storage.getItem('message');
  if(result){
    res.redirect("/");
  }else{
    res.status(404).send(message);
  }
  storage.removeItem('success');
  storage.removeItem('message');
});

router.get('/login', function(req, res, next) {
  res.redirect("/");
});

router.post("/login", function(req, res, next){
  let body = req.body;
  let result;
  
  API_Call("signin", JSON.stringify(body));
  //console.log(storage.getItem('accessToken'));
  //console.log(result);
  res.status(404).send(message);
});

router.get("/logout", function(req,res,next){
  storage.clear();
  res.redirect("/");
});

module.exports = router;