const express = require('express');
const router = express.Router();
const models = require("../models");
const request = require('request');
const localStorage = require('node-localstorage').LocalStorage;
const storage = new localStorage('./scratch');

function API_Call(func, body) {
  var OPTIONS = {
      headers: {'Content-Type': 'application/json'},
      url: null,
      body: null
  };
  const PORT = '80';
  const BASE_PATH = '/api/auth';
  var HOST = 'http://localhost';
  OPTIONS.url = HOST + ':' + PORT + BASE_PATH + '/' + func;
  OPTIONS.body = body;
  request.post(OPTIONS, function (err, res, result) {
    
    console.log(result);
    if('signin' == func){

    }else{
      storage.setItem('success', JSON.parse(result).success);
      storage.setItem('message', JSON.parse(result).message);
    }
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.email != null){
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
  result = storage.getItem('success');
  message = storage.getItem('message');
  if(result){
    res.redirect("/");
  }else{
    res.status(404).send(message);
  }
  storage.clear();
});

router.get('/login', function(req, res, next) {
    if(req.session.email != null){
      res.redirect("/");
    }else{
      console.log(req.signedCookies.user);
      if(req.signedCookies.user){
        res.render("user/login", {email : req.signedCookies.user});
      }else{
        res.render("user/login", {email : ''});
      }
    }
});

router.post("/login", function(req,res,next){
    let body = req.body;
    API_Call("signin", JSON.stringify(body));
  });

  router.get("/logout", function(req,res,next){
      req.session.destroy();
      res.clearCookie('sid');
      res.redirect("/");
  });

module.exports = router;