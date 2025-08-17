const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Movie = require('./Models/Movie'); // adjust the path if needed

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Load Routes
app.use('/api/movies', require('./Routes/movies'));
// Api to add movie into backend from frontend 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Backend running on port ${PORT}`));
