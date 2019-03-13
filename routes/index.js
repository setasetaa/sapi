const express = require('express');
const models = require('../models');
const router = express.Router();
const storage = require('sessionstorage');


router.get('/', function(req, res, next) {
  console.log(storage.getItem('accessToken'));
  if(storage.getItem('accessToken') != null){
    res.render("index");
  }else{
    res.render("user/login");
  }
});

module.exports = router;