const express = require('express')
const dbconfig = require('./config/dbconfig')
const User = require('./modal/userScema')
const app = express()
app.use(express.json())
dbconfig()
// ============================

app.post('/user', function (req, res) {
  const {firstName, lastName, phone, email, password, addressOne, addressTwo, zipCode, city, division, district} = req.body
  if(!firstName){
    return res.send({error: 'firstName is required'})
  }
  if(!lastName){
    return res.send({error: 'lastName is required'})
  }
  if(!addressOne){
    return res.send({error: 'Address is required'})
  }
  if(!zipCode){
    return res.send({error: 'ZipCode is required'})
  }
  if(!city){
    return res.send({error: 'City is required'})
  }
  if(!division){
    return res.send({error: 'Division is required'})
  }
  if(!district){
    return res.send({error: 'firstName is required'})
  }
  
  const user = new User({
    firstName,
    lastName,
    phone,
    email,
    password,
    addressOne,
    addressTwo,
    zipCode,
    city,
    division,
    district
  })

  user.save()

  res.send(user)

})

app.listen(8000, ()=>{
    console.log('Server is running')
})