import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  createdAt?: Date;
}

const productSchema = new Schema<IProduct>(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
  },
  {
    timestamps: true, // Crea automáticamente createdAt y updatedAt
  }
);

export const Product = model<IProduct>('Product', productSchema);
