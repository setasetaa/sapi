const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

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

  crypto.randomBytes(64, function(err, buf) {
    let salt = buf.toString('base64');
    crypto.pbkdf2(body.password, salt, 100000, 64, 'sha512', function(err, key){
      models.user.create({
        com_regno: body.comRegno,
        bizCode: body.bizCode,
        user_name: body.userName,
        email: body.userEmail,
        tel_num: body.telNum,
        password: key.toString('base64'),
        salt: salt,
        dept_name: body.dept,
        sbid: body.SBID,
        sbpass: body.SBPass,
        token: body.token
      }).then( result => {
        console.log("register success");
        res.redirect("/user/login");
      }).catch( err => {
        console.log(err);
        res.redirect("/user/register");
      })
    });
  });
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
          req.session.username = result.dataValues.user_name;
          req.session.token = result.dataValues.token;
          req.session.deptname = result.dataValues.dept_name;
          req.session.telNum = result.dataValues.tel_num;
          req.session.sbid = result.dataValues.sbid;
          
          //req.session.bizCode = result.dataValues.bizCode;
          //console.log(req.session.email);
          //res.redirect("/");
          models.company.find({
            where: {com_regno : body.comRegno, bizplace_code : body.bizCode}
          }).then( result => {
            req.session.comregno = result.dataValues.com_regno;
            req.session.bizCode = result.dataValues.bizplace_code;
            req.session.comName = result.dataValues.com_name;
            req.session.repName = result.dataValues.rep_name;
            req.session.comAddr = result.dataValues.addr;
            req.session.comType = result.dataValues.type;
            req.session.comClassify = result.dataValues.classify;
            req.session.code = result.dataValues.code;
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

    })
    .catch( err => {
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
