const { auth } = require('../middlewear/auth');
const { SignUp, SignIn, profile } = require('../services/user.services');
const { signUpValidation } = require('../validation/signup.validation');

const Router = require('express').Router();

Router.post('/signup',signUpValidation,SignUp);
Router.post('/signin',SignIn);
Router.get('/profile',auth(),profile);
module.exports=Router;