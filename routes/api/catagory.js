const express = require('express')
const catagory = require('../../controllers/produchControllers/catagoryControllers')
const router = express.Router()

router.post('/createcatagory', catagory)


module.exports = router