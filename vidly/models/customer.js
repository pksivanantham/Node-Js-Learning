const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('customers', {
    isGold: Boolean,
    name: {
        type: String,
        requires: true,
        minlength: 3,
        maxlength: 50

    },
    phone: {
        type: String,
        maxlength: 20
    }
});

function validateCustomer(customer) {

    var schema = {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().max(20),
        isGold: Joi.boolean()

    };
    return Joi.validate(customer, schema);
};

module.exports = {

    Customer,
    validate: validateCustomer
};