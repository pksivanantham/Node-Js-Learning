const express = require('express');
const router = express.Router();
const { Genre, validate} = require('../models/genre');
router.get('/', async (req, res) => {
  let genres = await Genre.find().select('id name');
  res.send(genres);
});

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete({ _id: req.params.id });
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById({ _id: req.params.id })
    .select('id name');
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;