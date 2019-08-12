const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
  .then(() => console.log('Connected to the database..'))
  .catch((err) => console.log('Unable to connect to the database..', err));

const genreSchema = mongoose.Schema({

  id: Number,
  name: { type: String, required: true }
});

const Genre = mongoose.model('genre', genreSchema);

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];

router.get('/', async (req, res) => {
  let genres = await Genre.find().select('id name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    $inc: { 'id': 1 },
    name: req.body.name
  });
  let result;
  try {
    result = await genre.save();

  }
  catch (err) {
    result = err;
  }

  res.send(result);
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