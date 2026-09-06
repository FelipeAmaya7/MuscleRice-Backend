import { Schema, model, Document } from 'mongoose';

// 1. Definimos la interfaz TypeScript para autocompletado y tipos
export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  createdAt?: Date;
}

// 2. Definimos el Esquema de Mongoose para MongoDB
const userSchema = new Schema<IUser>(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Registra la fecha de creación automáticamente
  }
);

// 3. Exportamos el Modelo para poder hacer User.find(), User.create(), etc.
export const User = model<IUser>('User', userSchema);
