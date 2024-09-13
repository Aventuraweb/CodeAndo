"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = (req, res, next) => {
    if (req.session.idUsuario) {
        next();
    }
    else {
        res.status(401).json({ message: 'No estás autenticado' });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map