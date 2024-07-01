const winston = require('winston');

// Define los niveles de log y colores (opcional)
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Define el formato de los logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Define los transportes (dónde se guardarán los logs)
const transports = [
  // Consola
  new winston.transports.Console(),
  // Archivo para todos los logs
  new winston.transports.File({
    filename: 'logs/all.log',
  }),
  // Archivo solo para errores
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
];

// Crea la instancia del logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'warn',
  levels,
  format,
  transports,
});

// Si estamos en desarrollo, también log a la consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Añade colores al logger
winston.addColors(colors);

module.exports = logger;
