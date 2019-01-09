const express = require('express');
const models = require('../models');
const router = express.Router();
const fs = require('fs');

router.get('/AR01', function(req, res, next){
    res.render('dti/form/AR01', {session : req.session});
});
router.get('/AR02', function(req, res, next){
    res.render('dti/form/AR02', {session : req.session});
});
router.get('/AR03', function(req, res, next){
    res.render('dti/form/AR03', {session : req.session});
});
  
router.get('/AP01', function(req, res, next){
    res.render('dti/form/AP01', {session : req.session});
});
router.get('/AP02', function(req, res, next){
    res.render('dti/form/AP02', {session : req.session});
});
router.get('/AP03', function(req, res, next){
    res.render('dti/form/AP03', {session : req.session});
});

module.exports = router;