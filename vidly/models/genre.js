const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const genreMongooseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
})
const Genre = mongoose.model('genre',genreMongooseSchema );


function validateGenre(genre) {
    const genreJoiSchema = {
        name: Joi.string().min(3).max(50).required()
    };
    return Joi.validate(genre, genreJoiSchema);
}

module.exports = {
    Genre,
    validate: validateGenre,
    genreMongooseSchema
}