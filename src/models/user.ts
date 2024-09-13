import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interfaz para el documento del usuario
interface IUser extends Document {
  idUsuario: number;
  nombreUsuario: string;
  Correo: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definición del esquema del usuario
const userSchema: Schema<IUser> = new Schema({
  idUsuario: {
    type: Number,
    required: true,
    unique: true,
  },
  nombreUsuario: {
    type: String,
    required: true,
  },
  Correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-guardado: cifrar la contraseña antes de guardarla
userSchema.pre<IUser>('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Modelo de usuario
const User = mongoose.model<IUser>('User', userSchema);

export default User;
