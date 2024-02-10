const express = require('express')
const router = express.Router()
const authentication = require('./auth')
router.use('/auth', authentication)

module.exports = router