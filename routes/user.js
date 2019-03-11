const express = require('express');
const router = express.Router();
const models = require("../models");
const request = require('request')

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
    switch (res.statusCode) {
      case 200:
        res.redirect("/");
        break;
      default:
        res.render("user/register");
        break;
    }
    console.log(result);
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
    var comRegno, bizCode;
    console.log(body.check);
    if(body.check == 'checked'){
      // 쿠키 설정
      res.cookie("user", body.userEmail , {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
        signed: true
      });
    }
    models.user.find({
        where: {email : body.userEmail}
    })
    .then( result => {
      let dbPassword = result.dataValues.password;
      let salt = result.dataValues.salt;
      crypto.pbkdf2(body.password, salt, 100000, 64, 'sha512', function(err, key){
        //console.log("input : " + key.toString('base64'));
        if(dbPassword === key.toString('base64')){
          console.log("비밀번호 일치");
          req.session.email = result.dataValues.email;
          req.session.username = result.dataValues.username;
          req.session.token = result.dataValues.token;
          req.session.deptname = result.dataValues.deptname;
          req.session.telNum = result.dataValues.telnum;
          req.session.sbid = result.dataValues.sbid;
          comRegno = result.dataValues.comregno;
          bizCode = result.dataValues.bizcode;
          if(null == bizCode){
            bizCode = '';
          }
          models.company.find({
            where: {comregno : comRegno, bizplace_code : bizCode}
          }).then( result => {
            req.session.comRegno = result.dataValues.com_regno;
            req.session.bizCode = result.dataValues.bizplace_code;
            req.session.comName = result.dataValues.com_name;
            req.session.repName = result.dataValues.rep_name;
            req.session.comAddr = result.dataValues.addr;
            req.session.comType = result.dataValues.type;
            req.session.comClassify = result.dataValues.classify;
            req.session.code = result.dataValues.code;
            console.log(req.session);
            res.status(200).send();
          }).catch( err => {
            console.log(err);
            res.status(402).send();
          });
        }
        else{
          console.log("비밀번호 불일치");
          res.status(401).send();
        }
      });
    }).catch( err => {
        console.log(err);
        res.status(402).send();
    });
  });

  router.get("/logout", function(req,res,next){
      req.session.destroy();
      res.clearCookie('sid');
      res.redirect("/");
  });

module.exports = router;