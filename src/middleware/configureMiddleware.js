const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

function configureMiddleware(app, corsOptions) {
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(express.json());
}

module.exports = configureMiddleware;
