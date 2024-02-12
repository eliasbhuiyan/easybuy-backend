const User = require("../../modal/userScema")
const bcrypt = require('bcrypt')
const loginControllers = async (req, res)=>{
    const {email, password} = req.body
    if(!email){
        return res.send({error: 'Email is required'})
    }else if(!password){
        return res.send({error: 'Password is required'})
    }else{
        const existingUser = await User.find({email})
        if(existingUser.length > 0){
            bcrypt.compare(password, existingUser[0].password, function(err, result){
                if(result){
                    return res.send({message: 'Login Successfull', 
                    user: existingUser[0].firstName + ' ' + existingUser[0].lastName ,
                    email: existingUser[0].email,
                })
                }else{
                    return res.send({error: 'Authorization Failed'})
                }
            })
        }else{
            return res.send({error: 'Authorization Failed'})
        }
    }
}

module.exports = loginControllers