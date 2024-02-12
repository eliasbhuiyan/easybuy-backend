const User = require('../../modal/userScema')
const emailValidation = require('../../utilities/emailValidation')
const emailVerification = require('../../utilities/emailVerification')
const verifyTemplete = require('../../utilities/verifyTemplete')
const passwordValidation = require('../../utilities/passwordValidation')
const bcrypt = require('bcrypt');
const token = require('../../utilities/token')
const registration = async (req, res) => {
    const {firstName, lastName, phone, email, password, addressOne, addressTwo, zipCode, city, division, district} = req.body
    if(!firstName){
      return res.send({error: 'firstName is required'})
    }
    else if(!lastName){
      return res.send({error: 'lastName is required'})
    }
    else if(!addressOne){
      return res.send({error: 'Address is required'})
    }
    else if(!zipCode){
      return res.send({error: 'ZipCode is required'})
    }
    else if(!city){
      return res.send({error: 'City is required'})
    }
    else if(!division){
      return res.send({error: 'Division is required'})
    }
    else if(!district){
      return res.send({error: 'firstName is required'})
    }
    else if(!email){
      return res.send({error: 'Email is required'})
    }
    else if(!emailValidation(email)){
      return res.send({error: 'Email is invalid'})
    }
    else if(!password){
      return res.send({error: 'Password is required'})
    }
  // else if(!passwordValidation(password)){
  //     return res.send({error: 'Input a strong password'})
  //   }
  else{
    const existingUser = await User.find({email})
    if(existingUser.length > 0){
      return res.send({error: 'Email already in used, please try with another email'})
    }
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
            district,
            otp: token(),
            })
            user.save() 
            emailVerification(user.email, user.otp, verifyTemplete)
            res.send({Success: 'Registration Successful'})
          });
}
module.exports = registration