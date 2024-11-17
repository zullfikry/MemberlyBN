const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Mongoose connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Database Connected'))
  .catch((err) => console.log('Database not connected', err));

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Use routes (authRoutes contains the file upload route)
app.use('/', authRoutes);

const port = 8000;
app.listen(port, () => console.log('Server is running on port 8000'));
