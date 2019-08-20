const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const {  genreMongooseSchema } = require('../models/genre');

const Movie = mongoose.model('movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    genre: {
        type: genreMongooseSchema,
        required: true
    },
    numberInStock: Number,
    dailyRentalRate:  {
        type:Number,
        required:true,
        min:0
    }

}));

function validate(movie) {

    let schema = {

        title: Joi.string().required().max(100),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required().min(0),
        dailyRentalRate: Joi.number().required().min(0)
    };

    return Joi.validate(movie, schema);

}

module.exports = {
    Movie,
    validate
}