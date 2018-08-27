const express = require('express');
const models = require('../models');
const router = express.Router();
const crypto = require("crypto");

router.get('/APlist', function(req, res, next){
  res.render("dti/list/APlist");
});
router.post('/APlist', function(req, res, next) {
  models.dti_main.findAll().then( result => {
  res.send(result);
  });
});

















module.exports = router;
