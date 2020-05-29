
const express = require('express')
const router = express.Router()
const service = require('./service')
const { firebaseAuth } = require('../middleware')
router
    
    .post('/writeFeed',firebaseAuth,service.getWriteFeed)
    
   
module.exports = router