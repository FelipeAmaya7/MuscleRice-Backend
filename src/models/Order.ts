import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  clienteEmail: string;
  total: number;
  estado: string; // 'pendiente', 'pagado', 'enviado'
  productos: {
    productoNombre: string;
    cantidad: number;
    precioUnitario: number;
  }[];
  createdAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    clienteEmail: { type: String, required: true },
    total: { type: Number, required: true },
    estado: { type: String, default: 'pendiente' },
    productos: [
      {
        productoNombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Order = model<IOrder>('Order', orderSchema);
