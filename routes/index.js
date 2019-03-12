const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.jwt != null){
    res.render("index", {session : req.session});
  }else{
    res.render("user/login");
  }
});

module.exports = router;