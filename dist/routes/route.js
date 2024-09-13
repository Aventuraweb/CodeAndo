"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
// Ruta de prueba
router.get('/', (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.idUsuario) {
        res.send(`Hola, usuario ${req.session.idUsuario}`);
    }
    else {
        res.send('No estás logueado.');
    }
});
// Ruta para el registro
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUsuario, nombreUsuario, Correo, password } = req.body;
    try {
        // Verificar si el correo ya está en uso
        const existeUser = yield user_1.default.findOne({ Correo });
        if (existeUser) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }
        else {
            // Crear un nuevo usuario
            const newUser = new user_1.default({
                idUsuario,
                nombreUsuario,
                Correo,
                password,
            });
            // Guardar el usuario en la base de datos
            yield newUser.save();
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}));
// Ruta para login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Correo, password } = req.body;
    try {
        // Buscar el usuario por correo
        const user = yield user_1.default.findOne({ Correo });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        else {
            // Verificar la contraseña (usando tu método `comparePassword`)
            const validPassword = yield user.comparePassword(password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }
            else {
                // Almacenar el idUsuario en la sesión
                req.session.idUsuario = user.idUsuario;
                return res.status(200).json({ message: 'Login exitoso' });
            }
        }
    }
    catch (error) {
        console.error('Error en el servidor durante el login:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}));
// Ruta para logout
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new Promise((resolve, reject) => {
            req.session.destroy((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
        res.status(200).json({ message: 'Logout exitoso' });
    }
    catch (error) {
        console.error('Error al cerrar sesión:', error);
        res.status(500).json({ message: 'Error al cerrar sesión' });
    }
}));
exports.default = router;
//# sourceMappingURL=route.js.map