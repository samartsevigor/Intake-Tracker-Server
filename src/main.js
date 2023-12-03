require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const medicationRoutes = require('./routes/medication.route');
const {SERVER_PORT} = require('./constants/constants');

const expressApp = express();

const startServer = (app) => {
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/medication', medicationRoutes);

  app.use('/', (__req, res) => {
    res.status(404).json({massage: 'Not found'});
  });

  app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
  });
};

startServer(expressApp);
