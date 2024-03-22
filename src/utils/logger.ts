import winston from 'winston';
const levels = {
  error: 0,
  info: 1,
  debug: 2,
  verbose: 3,
};
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);
const logger = winston.createLogger({
  levels,
  format,
  handleExceptions: true,
  handleRejections: true,
  transports: [new winston.transports.Console({ level: 'verbose' })],
});

logger.exitOnError = false;

export default logger;
