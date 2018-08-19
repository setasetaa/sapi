const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.email != null){
    res.render("index", {
      session : req.session
    });
  }else{
    res.render("user/login");
  }
});
router.get('/show', function(req, res, next) {
  models.post.findAll().then( result => {
    var loopIndex = 0;

    for(let post of result){
      models.post.find({
        include: {model: models.reply, where: {postId: post.id}}
      }).then( result2 => {
        if(result2){
          post.replies = result2.replies
        }
        loopIndex++;
        if( loopIndex === result.length){
          res.render("show", {
            posts : result
          });
        }
      });
    }
  });
});

router.post('/create', function(req, res, next) {
    let body = req.body;

    models.post.create({
        title: body.inputTitle,
        writer: body.inputWriter
    })
    .then( result => {
        console.log("데이터 추가 완료");
        res.redirect("/show");
    })
    .catch( err => {
        console.log("데이터 추가 실패");
    })
});

router.get('/edit/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.find({
      where: {id: postID}
  })
  .then( result => {
      res.render("edit", {
          post: result
      });
  })
  .catch( err => {
      console.log("데이터 조회 실패");
  });
});

router.put('/update/:id', function(req, res, next) {
  let  postID = req.params.id;
  let body = req.body;

  models.post.update({
      title: body.editTitle,
      writer: body.editWriter
  },{
      where: {id: postID}
  })
  .then( result => {
      console.log("데이터 수정 완료");
      res.redirect("/show");
  })
  .catch( err => {
      console.log("데이터 수정 실패");
  });
});

router.delete('/delete/:id', function(req, res, next) {
  let postID = req.params.id;

  models.post.destroy({
      where: {id: postID}
  })
  .then( result => {
      res.redirect("/show")
  })
  .catch( err => {
      console.log("데이터 삭제 실패");
  });
});

router.post("/reply/:postID", function(req, res, next){
  let postID = req.params.postID;
  let body = req.body;

  models.reply.create({
    postId : postID,
    writer : body.replyWriter,
    content : body.replyContent
  })
  .then( result => {
    res.redirect("/show");
  })
  .catch( err => {
    console.log(err);
  });
});

module.exports = router;
