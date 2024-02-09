const express = require('express')
const dbconfig = require('./config/dbconfig')
const User = require('./modal/userScema')
const emailValidation = require('./utilities/emailValidation')
const passwordValidation = require('./utilities/passwordValidation')
const bcrypt = require('bcrypt');
require('dotenv').config()
const app = express()
app.use(express.json())
dbconfig()
// ============================

app.post('/user', async function (req, res) {
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
  if(!email){
    return res.send({error: 'Email is required'})
  }
  if(!emailValidation(email)){
    return res.send({error: 'Email is invalid'})
  }
  if(!password){
    return res.send({error: 'Password is required'})
  }
//   if(!passwordValidation(password)){
//     return res.send({error: 'Input a strong password'})
//   }
  const existingUser = await User.find({email})

  if(existingUser.length > 0){
     return res.send({error: 'Email already in used, please try with another email'})
  }
    bcrypt.hash(password, 10, function(err, hash) {
        const user = new User({
            firstName,
            lastName,
            phone,
            email,
            password: hash,
            addressOne,
            addressTwo,
            zipCode,
            city,
            division,
            district
          })
          user.save()
          res.send(user)
    });
})

app.listen(8000, ()=>{
    console.log('Server is running')
})