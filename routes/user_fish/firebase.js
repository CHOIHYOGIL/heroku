
var admin = require("firebase-admin");



function authCheck(token) {
    console.log("hi")
    return admin.auth().verifyIdToken(token)
};



exports.authCheck = authCheck;
