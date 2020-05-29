

var qs = require('querystring');
const { Users, Board } = require('../../models')
const { Sequelize } = require("sequelize");
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");



function getUseralldata(page) {
  let offset1 = 0;
  if (page > 1) {
    offset1 = 20 * (page - 1);
  }
  return Board.findAll({
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

  return Users.findOrCreate({
    where: {
      uid: uid

    }
  })
}

function getUseridbyUid(uid) {
  return Users.findAll({
    where: {
      uid: uid
    },
    attributes: ['id']
  })
}

function writeBoard(user, content) {

  return Board.create({
    user_id: user.id,
    user_uid: user.uid,
    content: content
  })

}



function getUsercontent() {
  return Board.findAll({
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