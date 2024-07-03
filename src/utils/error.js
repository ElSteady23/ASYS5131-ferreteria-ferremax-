const winston = require('winston');
const sanitizeHtml = require('sanitize-html');


const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

exports.httpError = (res, message, error) => {
  const sanitizedError = sanitizeHtml(error.toString(), {
    allowedTags: [],
    allowedAttributes: {},
  });

  const errorResponse = {
    error: {
      message,
      details: sanitizedError,
    },
  };

  logger.error(`${message}: ${sanitizedError}`);

  res.status(500).json(errorResponse);
};

// Ejemplo de uso en un middleware de manejo de errores
