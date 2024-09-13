import { Router } from 'express';
import User from '../models/user';

const router = Router();

// Ruta de prueba
router.get('/', (req, res) => {
  if (req.session?.idUsuario) {
    res.send(`Hola, usuario ${req.session.idUsuario}`);
  } else {
    res.send('No estás logueado.');
  }
});

// Ruta para el registro
router.post('/register', async (req, res) => {
    const { idUsuario, nombreUsuario, Correo, password } = req.body;
  
    try {
      // Verificar si el correo ya está en uso
      const existeUser = await User.findOne({ Correo });
      if (existeUser) {
        return res.status(400).json({ message: 'El correo ya está en uso' });
      }else{
        // Crear un nuevo usuario
          const newUser = new User({
            idUsuario,
            nombreUsuario,
            Correo,
            password,
          });
        // Guardar el usuario en la base de datos
          await newUser.save();
          res.status(201).json({ message: 'Usuario registrado exitosamente' });
      }   
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

// Ruta para login
router.post('/login', async (req, res) => {
    const { Correo, password } = req.body;
  
    try {
      // Buscar el usuario por correo
      const user = await User.findOne({ Correo });
  
      if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      } else {
        // Verificar la contraseña (usando tu método `comparePassword`)
        const validPassword = await user.comparePassword(password);
  
        if (!validPassword) {
          return res.status(400).json({ message: 'Contraseña incorrecta' });
        } else {
          // Almacenar el idUsuario en la sesión
          req.session!.idUsuario = user.idUsuario;
          return res.status(200).json({ message: 'Login exitoso' });
        }
      }
    } catch (error) {
      console.error('Error en el servidor durante el login:', error);
      return res.status(500).json({ message: 'Error en el servidor' });
    }
  });

// Ruta para logout
router.post('/logout', async (req, res) => {
  try {
    await new Promise<void>((resolve, reject) => {
      req.session!.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    res.status(200).json({ message: 'Logout exitoso' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
});

export default router;
