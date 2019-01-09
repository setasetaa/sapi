const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.email != null){
    res.render("index", {session : req.session});
  }else{
    if(req.signedCookies.user){
      res.render("user/login", {email : req.signedCookies.user});
    }else{
      res.render("user/login", {email : ''});
    }
  }
});

module.exports = router;