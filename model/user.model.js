const { mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");

const UserSchema = mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    phone:String,
    password:String
},{timestamp:true});
UserSchema.pre('insertMany',async function(next,docs){
    docs.password = await bcrypt.hash(docs.password,
        parseInt(process.env.SaltRound));
        docs.phone = CryptoJS.AES.encrypt(docs.phone, process.env.encryptKey).toString();
        console.log(docs);
        next();
})


module.exports = mongoose.model('user',UserSchema);