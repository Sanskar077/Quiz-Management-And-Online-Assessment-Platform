const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const healthRoutes = require('./routes/health.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

// Security & parsing middleware
app.use(helmet());
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (dev only)
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// API routes
app.use('/api/health', healthRoutes);

// 404 + centralized error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
