const { User } = require('../models/user');
const Joi = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/',async(req,res)=>{

    let { error } = validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    let user  = await User.findOne({email:req.body.email});
    if(!user)  return res.status(400).send('Email or Password is incorrect.');  
    
    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordMatch) res.status(400).send('Email or Password is incorrect.')

    return res.header('x-vidly-jwt',user.generateToken()).send('User Logged Successfully.');

});

function validate(user){

    let schema= {
        
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(5).max(50)

    };

    return Joi.validate(user,schema);

};

module.exports = router;