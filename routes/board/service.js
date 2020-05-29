
const user_info=require('../../models');
const repository = require('./repository')



function getWriteFeed(req, res) {
     
    let content =req.body.content;
    let user= req.user;

    
  if (user) {
    repository.writeBoard(user, content)
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

exports.getWriteFeed = getWriteFeed



