const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Genre = mongoose.model('genre', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = {
    Genre,
    validate: validateGenre
}