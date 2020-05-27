const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');

router.get('/', async (req, res, next) => {
 // throw new Error('Hey i am not available');
  let genres = await Genre.find().select('id name');
  res.send(genres);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save().catch((err) => {
    res.status(500).send(err);
    return;
  });

  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = await Genre.findByIdAndUpdate({ _id: req.params.id },
    {
      name: req.body.name
    },
    { new: true });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  genre = await genre.save();

  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id',validateObjectId, async (req, res) => {
  const genre = await Genre.findById({ _id: req.params.id })
    .select('id name');
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;