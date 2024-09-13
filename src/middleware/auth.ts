import { Request, Response, NextFunction } from 'express';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if ((req.session as any).idUsuario) {
    next();
  } else {
    res.status(401).json({ message: 'No estás autenticado' });
  }
};
