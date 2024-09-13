//configuracion de libreria wiston 
import { createLogger, transports, format } from 'winston';

export const registrar = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.simple()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});
