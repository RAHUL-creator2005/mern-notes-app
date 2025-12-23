/*
  Error handling middleware
  This middleware catches and handles errors from our routes
*/

// Handle Mongoose validation errors (when required fields are missing)
const handleValidationError = (error, res) => {
  const errors = Object.values(error.errors).map(err => err.message);
  return res.status(400).json({
    message: 'Validation Error',
    errors: errors
  });
};

// Handle Mongoose cast errors (when invalid ID is provided)
const handleCastError = (error, res) => {
  return res.status(400).json({
    message: 'Invalid ID format',
    error: 'The provided ID is not valid'
  });
};

// Handle duplicate key errors (when trying to create something that already exists)
const handleDuplicateError = (error, res) => {
  return res.status(400).json({
    message: 'Duplicate Error',
    error: 'This item already exists'
  });
};

// Main error handling middleware
const errorHandler = (error, req, res, next) => {
  console.error('Error occurred:', error);

  // Use custom status code if provided, otherwise default to 500
  let statusCode = error.statusCode || 500;

  // Handle different types of Mongoose errors
  if (error.name === 'ValidationError') {
    return handleValidationError(error, res);
  }

  if (error.name === 'CastError') {
    return handleCastError(error, res);
  }

  if (error.code === 11000) {
    return handleDuplicateError(error, res);
  }

  // Handle custom errors with status codes
  if (error.statusCode) {
    return res.status(statusCode).json({
      message: error.message || 'Error occurred',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }

  // Handle other errors
  res.status(statusCode).json({
    message: 'Server Error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
};

// Middleware to handle 404 errors (when route is not found)
const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
