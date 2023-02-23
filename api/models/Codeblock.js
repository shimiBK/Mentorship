const mongoose = require('mongoose')


const CodeblockSchema = new mongoose.Schema({
    id:{type:Number},
    title:{type:String},
    code:{type:String},
    solution:{type:String}
});


module.exports = mongoose.model('Codeblock', CodeblockSchema );
