const express = require('express');
const models = require('../models');
const router = express.Router();
const crypto = require("crypto");

router.get('/APlist', function(req, res, next){
  res.render("dti/list/APlist");
});
router.post('/APlist', function(req, res, next) {
  models.dti_main.findAll().then( result => {
    var loopIndex = 0;

    for(let data of result){
      models.dti_main.find({
        include: {model: models.dti_status, where: {conversation_id: dti_main.conversation_id}}
      }).then( result2 => {
        if(result2){
          data.status = result2.status
        }
        loopIndex++;
        if( loopIndex === result.length){
          res.render({list : result});
        }
      });
    }
  });
});

















module.exports = router;
