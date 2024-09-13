"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrar = void 0;
//configuracion de libreria wiston 
const winston_1 = require("winston");
exports.registrar = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: 'error.log', level: 'error' })
    ]
});
//# sourceMappingURL=registro.js.map