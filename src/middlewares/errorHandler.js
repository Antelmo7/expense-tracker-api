import logger from "../utils/logger.js";

export default async function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Unexpected error';

  logger.error(`${statusCode} - ${message}`);

  if (error.stack) {
    logger.error(error.stack);
  }

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
}