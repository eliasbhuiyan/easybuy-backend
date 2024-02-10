const express = require('express')
const registration = require('../../controllers/authControllers/registrationControllers')
const loginControllers = require('../../controllers/authControllers/loginControllers')
const router = express.Router()

router.post('/registration', registration)
// will be changed with post request
router.get('/login', loginControllers)

module.exports = router