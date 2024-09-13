import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};
