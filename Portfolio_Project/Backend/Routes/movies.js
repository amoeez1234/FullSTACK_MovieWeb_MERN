const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');

// Get all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add a movie (admin only)
router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.status(201).json(movie);
});

// Edit a movie
router.put('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(204).end(); // success, no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/api/movies', async (req, res) => {
    try {
        console.log("Incoming data:", req.body); // shows in terminal

        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: "Error", error });
    }
});

module.exports = router;


module.exports = router;
