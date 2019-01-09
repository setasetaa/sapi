const express = require('express');
const models = require('../models');
const router = express.Router();
const fs = require('fs');

router.get('/ARform', function(req, res, next){
    res.render('dti/form/ARform', {session : req.session});
});
  
router.get('/APform', function(req, res, next){
    res.render('dti/form/APform', {session : req.session});
});



module.exports = router;