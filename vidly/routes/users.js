const {User,validate} = require('../models/user');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
//const bcrypt = require()

router.post('/',async (req,res)=>{

    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User(_.pick(req.body,['name','email','password']));

    await user.save();

    res.send(_.pick(user,['_id','name','email']));

});


module.exports= router;