const express = require('express')
const registration = require('../../controllers/authControllers/registrationControllers')
const router = express.Router()

router.post('/registration', registration)

module.exports = router