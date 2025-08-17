const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: [String],
   // <-- Added this
  year : Number , 
  rating: Number,
  description: String,
  downloadUrl: String,
} , {collection : "Movies"})

module.exports = mongoose.model('Movie', movieSchema);
