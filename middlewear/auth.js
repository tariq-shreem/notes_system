const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

const auth = ()=>{

    return async (req,res,next)=>{
    try {

     const headerToken =req.headers.authorization;
     if(!headerToken || headerToken==null 
        ||headerToken==undefined || headerToken.length==0
        ||!headerToken.startsWith(`${process.env.bearerToken}`)){
            res.json({message:"invalid header token bearer"});
        }
        
        else{
            const token = headerToken.split(' ')[1];
            if(!token || token==null || token==undefined || token.length==0){
                res.json({message:'invalid token'});
            }else {
                var decoded = jwt.verify(token,process.env.tokenSignature);
            const findUser = await userModel.findById(decoded._id)
            .select('email name');
           if(!findUser){
               res.json({message:'invalid login user id'});
           }else{
               req.user = findUser;
               next();
           }
        }
        }
        }catch(error){
            res.json(error)
        }
    }
}

module.exports={auth}