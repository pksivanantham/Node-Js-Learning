const express = require('express');
const router = express.Router();
const { Movie, validate} = require('../models/movie');
const { Genre, validate:validateGenre} = require('../models/genre');

router.get('/', async (req, res) => {
  let movies = await Movie.find();
  res.send(movies);
});

router.post('/', async (req, res) => {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre =await  Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send(`Given genreId:${req.body.genreId} is not valid`);

  let movie = new Movie({
    title: req.body.title,
    genre:{
        _id:genre._id,
        name:genre.name
    },
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
  });

  movie = await movie.save().catch((err) => {
    res.status(500).send(err);
    return;
  });

  res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre =await  Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send(`Given genreId:${req.body.genreId} is not valid`);

  let movie = await Movie.findByIdAndUpdate({ _id: req.params.id },
    {
        title: req.body.title,
        genre:{//Here we can pass genre whole object but it will save all properties of genre,including versions as well
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate          
    },
    { new: true });
  if (!movie) return res.status(400).send('The movie with the given ID was not found.');

  movie = await movie.save();

  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete({ _id: req.params.id });
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.find({ _id: req.params.id });
  if (!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});

module.exports = router;