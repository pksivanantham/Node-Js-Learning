const mongoose = require('mongoose');
const joi = require('@hapi/joi');
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

        title: joi.string().required().max(100),
        genreId: joi.objectId().required(),
        numberInStock: joi.number().required().min(0),
        dailyRentalRate: joi.number().required().min(0)
    };

    return joi.validate(movie, schema);

}

module.exports = {
    Movie,
    validate
}