
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");


module.exports.SignUp = async (req,res)=>{
    const {name,email,password,phone} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        res.json({message:'email already exists'});
    }else{
   /*     bcrypt.hash(password,Number(process.env.SaltRound), 
        async function(err, hash) {
        });*/
        await userModel.insertMany({name,email,password,phone});
        res.json({message:'success'});

}  
 

}

module.exports.SignIn= async (req,res)=>{

    const {email,password} = req.body;
    let user = await userModel.findOne({email});
    if(user){
        const match=bcrypt.compareSync(password, user.password); // true
        if(match){
            const token = jwt.sign({_id:user._id,name:user.nam,isLoggedIn:true}
                ,process.env.tokenSignature,{expiresIn:60000})
             res.json({message:'done',token});
        }else {
            res.json({message:'sorry,incorrect password '});
        }
    }else{
        res.json({message:`email ${email} does not exist`});
    }
}


module.exports.profile= async (req,res)=>{
    try{
        const user = await userModel.findById(req.user._id);
        user.phone= CryptoJS.AES.decrypt(user.phone, process.env.encryptKey).toString(CryptoJS.enc.Utf8);
        console.log(user);
        res.json({message:'done',user});

    }catch(error){
        res.json({message:'erro',error});
    }
} 