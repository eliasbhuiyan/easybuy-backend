const Catagory = require('../../modal/catagorySchema.js')
const catagory = async (req, res) => {
    const {name, description} = req.body;
    const existingCatagory = await Catagory.find({name});
    if(existingCatagory.length > 0){
        return res.send({error: 'Catagory already in used, please try with another Catagory'})
    }

    const catagory = new Catagory({
        name,
        description,
    })
    catagory.save()
    res.send({message: 'Catagory created'})
}
module.exports = catagory