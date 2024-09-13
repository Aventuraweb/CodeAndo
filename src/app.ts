import express from 'express'; 
import session from 'express-session'; 
import helmet from 'helmet'; 
import mongoose from 'mongoose'; 
import MongoStore from 'connect-mongo'; 
import errorHandler from './middleware/errorHandler';
import router from './routes/route'
import morgan from 'morgan';


const app = express(); 

// Configuraciones de seguridad
app.use(helmet());

// registrar
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());

// Configuración de sesiones con MongoDB
app.use(session({
    secret: 'mi_secreto_segurisimo', // Cambiar a una clave más segura en producción
    resave: false, // No resguardar la sesión si no se modifica
    saveUninitialized: true, 
    store: MongoStore.create({
      mongoUrl: 'mongodb://root:7845@crudfinal:27017/mydb', // URL de MongoDB
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
app.use('/api', router);

// Manejo de errores
app.use(errorHandler );


// Conexión a MongoDB y arranque del servidor
mongoose.connect('mongodb://root:7845@crudfinal:27017/mydb?authSource=admin')

const port = 3000; 

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});