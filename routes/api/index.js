const express = require('express')
const router = express.Router()
const authentication = require('./auth')
const catagory = require('./catagory')

router.use('/auth', authentication)
router.use('/catagory', catagory)

module.exports = router