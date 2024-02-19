const express = require('express')
require('dotenv').config()
const dbconfig = require('./config/dbconfig')
const path = require('path')
routes = require('./routes')
const app = express()
app.use(express.json())
dbconfig()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(routes)

app.listen(8000, () => {
    console.log('Server is running')
})