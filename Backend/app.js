const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/rides.routes');
const mongoose = require('mongoose');

mongoose.set('debug', true);
connectToDb();

app.use(cookieParser());

const allowedOrigins = [
  'https://uber-clone-project-nine.vercel.app',
];

const dynamicVercelRegex = /^https:\/\/uber-clone-project-[a-z0-9]+\.vercel\.app$/;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || dynamicVercelRegex.test(origin)) {
      callback(null, true);
    } else {
      console.log('CORS Rejected:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;
