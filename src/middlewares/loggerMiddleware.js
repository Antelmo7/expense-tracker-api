import logger from "../utils/logger.js";

export default async function loggerMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const message = `${req.method} ${req.url} - IP: ${req.ip}`;

  logger.info(message);

  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${res.statusCode} - ${duration}ms`);
  });

  next();
}