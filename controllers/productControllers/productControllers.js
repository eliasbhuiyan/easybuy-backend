const User = require("../../modal/userScema")
async function secureUpload(req, res) {
  if(!req.headers.authorization){
    return res.send({ error: "Authorization Failed" });
  }
  const userId = req.headers.authorization.split("@")[1];
  const password = req.headers.authorization.split("@")[2];

 try{
  let user = await User.find({ _id:userId});
   if(user.length > 0){
    if (password == process.env.SWTSECRT) {
      if(user[0].marchant){
        console.log("product");
      }else{
        return res.send({ error: "You are not able to upload product"});
      }
    }else{
      return res.send({ error: "Authorization Failed" });
    }
  }else{
    return res.send({ error: "Authorization Failed" });
  }
  
 }catch{
  return res.send({ error: "Authorization Failed" });
 }
 
}


const product = (req, res) => {

  console.log("product");
};

module.exports = { product, secureUpload};
