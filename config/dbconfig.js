const mongoose = require('mongoose');

module.exports = function dbconfig(){
    mongoose.connect('mongodb+srv://easybuy:JBnRBXBA2GTeEpkl@cluster0.415ohqy.mongodb.net/easybuy?retryWrites=true&w=majority')
  .then(() => console.log('Db Connected!'));
}