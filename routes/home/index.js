
const express = require('express')
const router = express.Router()
const service = require('./service')
const { firebaseAuth } = require('../middleware')
router
    
    .get('/',service.getHome)
    
   
module.exports = router