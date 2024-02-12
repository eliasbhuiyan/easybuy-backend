const User = require("../../modal/userScema")
const otpMatch = async (req, res) => {
    const { email, otp } = req.body
    if (!otp) {
        return res.send({ error: 'OTP is required' })
    }else{
        const existingUser = await User.find({ email })
        if(existingUser.length > 0){
            if(existingUser[0].otp == otp){
                await User.findOneAndUpdate(
                    {email},
                    { $set: {otp: null}},
                    {new: true}
                    )
                return res.send({message: 'OTP verified'})
               
            }else{
                return res.send({error: 'Failed'})
            }
        }else{
            return res.send({error: 'Failed'})

        }
    }
}

module.exports = otpMatch