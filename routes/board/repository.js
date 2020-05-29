

var qs = require('querystring');
const { users, board } = require('../../models')
const { Sequelize } = require("sequelize");
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");



function getUseralldata(page) {
  let offset1 = 0;
  if (page > 1) {
    offset1 = 20 * (page - 1);
  }
  return board.findAll({
    order: [['id', 'desc']],
    include: [{
      model: Users,
      attributes: ['name', 'birth', 'gender', 'createdAt']
      //  where:{user_uid :Sequelize.col('users.uid')}
    }],
    attributes: ['id', 'content', 'createdAt'],
    limit: 20,
    offset: offset1

  });

}
function uidFindOrCreate(uid) {

  return users.findOrCreate({
    where: {
      uid: uid

    }
  })
}

function getUseridbyUid(uid) {
  return users.findAll({
    where: {
      uid: uid
    },
    attributes: ['id']
  })
}

function writeBoard(uid,email,content,title) {

    console.log("writebOARD")

  return board.create({

      board_uid: uid,
      board_nickname:email,
    board_hit: title,
    board_content: content
  })

}



function getUsercontent() {
  return board.findAll({
    attributes: ['content']
  })
}

function getUserInfo(uid) {

  return Board.findAll({
    where: {
      user_uid: uid
    },
    attributes: ['id']
  })
}



exports.getUseralldata = getUseralldata
exports.uidFindOrCreate = uidFindOrCreate
exports.getUserInfo = getUserInfo
exports.writeBoard = writeBoard
exports.getUsercontent = getUsercontent






  //    User_Info.findAll().then(function(result){
  //             cb(result)
  //     });
  //    db.query(sql,function(error,result){

  //       cb(result);
  //    });\

  //var result= await respository.getUseralldata();
  //res.json(result);  위에 promise랑 같은기능  await 사용하려면 async함수로 선언되어야 한다.