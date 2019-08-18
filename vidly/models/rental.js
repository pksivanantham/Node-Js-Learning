const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const Rental = mongoose.model('rental', mongoose.Schema({
    customer: {
        type: mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50

            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                maxlength: 20
            }
        }),
        required: true
    },
    movie: {
        type: mongoose.Schema({
            title: {
                type: String,
                required: true,
                maxLength: 100
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }

}));

function validateRental(rental) {
    let schema = {
        movieId: joi.string().required(),
        customerId: joi.string().required()
    };
    return joi.validate(rental, schema);
}

module.exports = {
    Rental,
    validate:validateRental
}