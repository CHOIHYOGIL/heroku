

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
    order: [['board_num', 'desc']],
    // include: [{
    //   model: users,
    //   attributes: ['user_id', 'user_name', 'user_nickname', 'user_password','user_email','user_phone','createdAt']
    //   //  where:{user_uid :Sequelize.col('users.uid')}
    // }],
    attributes: ['board_num', 'board_nickname', 'board_content','board_hit','createdAt'],
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