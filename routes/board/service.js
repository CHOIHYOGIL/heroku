
const user_info=require('../../models');
const repository = require('./repository')


const { userCheck } = require('../user_fish/firebase');

function getWriteFeed(req, res) {

   
    let title=req.body.title;
    let uid=req.body.uid;
    let content =req.body.content;
    let nickname=req.body.nickname
    console.log("board here")
    console.log(req.body.nickname)
    
    
  if (uid) {
    repository.writeBoard(uid, nickname,  content, title)
    .then(response => {
      res.json({ status: "ok", message: "글작성 완료" })
    })
    .catch(error => {
      res.json({ status: "fail", message: error.message })
    })
  } else {
    res.status(403).json({completed:true});
  }
        
}


function getAllData(req,res){

  var page=req.query.page
  console.log(page)
  repository.getUseralldata(page)
  .then(result=>{
    res.json({
      board:result
   
    })
  })
}

function getUserContent(req, res) {

  var page=req.query.page
 var email=req.query.email
 var content=req.query.content
 repository.getUserFeed(page,email,content)
 .then(result=>{
   res.json({
    my_board:result
   })
 })

}

exports.getWriteFeed = getWriteFeed

exports.getAllData=getAllData

exports.getUserContent=getUserContent