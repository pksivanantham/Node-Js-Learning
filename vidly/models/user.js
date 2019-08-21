const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50

    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50

    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
        unique: true,

    }

});

schema.methods.generateToken = function () {

    return jwt.sign({
        name: this.name,
        email: this.email
    }, config.get('jwtPrivateKey'));

};

const User = mongoose.model('user', schema);

function ValidateUser(user) {

    let schema = {
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(5).max(50).email(),
        password: Joi.string().required().min(5).max(50)

    };

    return Joi.validate(user, schema);

};

module.exports = {
    User,
    validate: ValidateUser
}