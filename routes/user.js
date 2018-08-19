const express = require('express');
const router = express.Router();
const models = require("../models");
const crypto = require("crypto");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect("/");
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
        name: body.userName,
        email: body.userEmail,
        password: key.toString('base64'),
        salt: salt
      }).then( result => {
        res.redirect("/user/login");
      }).catch( err => {
        console.log("============");
        console.log(err);
      })
    });
  });
});

  router.get('/', function(req, res, next) {
    res.send('환영합니다~');
});


router.get('/login', function(req, res, next) {
    if(req.session.email != null){
      res.redirect("/");
    }else{
      res.render("user/login");
    }

});


router.post("/login", function(req,res,next){
    let body = req.body;

    models.user.find({
        where: {email : body.userEmail}
    })
    .then( result => {
        let dbPassword = result.dataValues.password;
        let salt = result.dataValues.salt;
        crypto.pbkdf2(body.password, salt, 100000, 64, 'sha512', function(err, key){
          console.log("input : " + key.toString('base64'));
          if(dbPassword === key.toString('base64')){
              console.log("비밀번호 일치");
              // 쿠키 설정
              res.cookie("user", body.userEmail , {
                  expires: new Date(Date.now() + 900000),
                  httpOnly: true
              });
              req.session.email = body.userEmail;
              console.log(req.session.email);
              res.redirect("/");
          }
          else{
              console.log("비밀번호 불일치");
              res.redirect("/user/login");
          }
        });

    })
    .catch( err => {
        console.log(err);
    });
  });

  router.get("/logout", function(req,res,next){
      req.session.destroy();
      res.clearCookie('sid');
      res.redirect("/user/login");
  });

module.exports = router;
