"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const route_1 = __importDefault(require("./routes/route"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// Configuraciones de seguridad
app.use((0, helmet_1.default)());
// registrar
app.use((0, morgan_1.default)('dev'));
// Middleware para parsear JSON
app.use(express_1.default.json());
// Configuración de sesiones con MongoDB
app.use((0, express_session_1.default)({
    secret: 'mi_secreto_segurisimo', // Cambiar a una clave más segura en producción
    resave: false, // No resguardar la sesión si no se modifica
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
        mongoUrl: 'mongodb//root:7845@localhost:27017/mydb', // URL de MongoDB
        collectionName: 'sessions', // Nombre de la colección donde se guardan las sesiones
        ttl: 14 * 24 * 60 * 60 // Tiempo de vida de la sesión (14 días en segundos)
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Tiempo de vida de la cookie (1 día)
        secure: false, // Cambiar a true en producción (si usas HTTPS)
        httpOnly: true, // Evita que las cookies sean accesibles desde JavaScript (mayor seguridad)
        sameSite: 'lax' // Protección contra ataques CSRF
    }
}));
// Rutas de la API
app.use('/api', route_1.default);
// Manejo de errores
app.use(errorHandler_1.default);
// Conexión a MongoDB y arranque del servidor
mongoose_1.default.connect('mongodb://root:7845@localhost:27017/mydb?authSource=admin');
const port = 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map