import winston from 'winston';
import { resolve } from 'path';

const logger = winston.createLogger({
    level: 'warn',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message }) => {
            return `[${new Date().toLocaleTimeString()}] ${level}: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.Console({ level: "http" }),
        new winston.transports.File({
            filename: resolve(`src/logs/app.log`),
            level: 'error',
            maxsize: 1048576, // Tamaño máximo del archivo en bytes (1MB)
            maxFiles: 5,
            tailable: true, // Si se establece en true, los archivos de registro antiguos se truncarán cuando se llegue al tamaño máximo
        }),
    ]
})

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} at ${req.url}`)
    next();
}
