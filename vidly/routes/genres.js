const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Genre = mongoose.model('genre', mongoose.Schema({
  name: { 
    type: String, 
    required: true ,
    minlength:3,
    maxlength:50
  }
}));

router.get('/', async (req, res) => {
  let genres = await Genre.find().select('id name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    $inc: { 'id': 1 },
    name: req.body.name
  });
  try {
    genre = await genre.save();
  }
  catch (err) {
    genre = err;
  }

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const genre = await Genre.findById({ _id: req.params.id });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  genre.save();
  res.send(genre);
});

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findById({ _id: req.params.id });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  let result = await Genre.findByIdAndDelete({ _id: req.params.id })
  res.send(result);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById({ _id: req.params.id })
    .select('id name');
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;