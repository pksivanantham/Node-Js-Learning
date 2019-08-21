const { User, validate } = require('../models/user');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/', async (req, res) => {

    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ 'email': req.body.email });
    if (user) return res.status(400).send('User already registered!');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    //Hashing password
    try {

        let salt = await bcrypt.genSalt(saltRounds);
        
        let passwordHash = await bcrypt.hash(user.password, salt);

        user.password = passwordHash;

        await user.save();

        res.header('x-vidly-jwt',user.generateToken()).send(_.pick(user, ['_id', 'name', 'email']));        

    }
    catch (ex) {
        console.log(ex);
        res.status(500).send('Error occured in server');
    }
});


module.exports = router;