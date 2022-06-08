const Joi = require('joi');
const Schema=Joi.object({
    name:Joi.string().alphanum().min(3).max(30).required(),
    email:Joi.string().email(),
    password:Joi.string()
});
module.exports.signUpValidation=(req,res,next)=>{
const {name,email,password} = req.body;
    let {error}= Schema.validate({name,email,password},{abortEarly:false});
    if(error==undefined){
        next();
    }else{
        res.json({error});
    }
}