var jwt = require('jsonwebtoken');
module.exports = function token(email){
    jwt.sign({ id: email }, process.env.SWTSECRT, function(err, token) {
       return token;
    });
}