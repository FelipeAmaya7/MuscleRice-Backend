import { Request, Response } from 'express';
import { Product } from '../models/Product.js';

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Product.find({});
    // Mapeamos _id a id para mantener compatibilidad transparente con el frontend
    const productosFormateados = productos.map(p => ({
      id: p._id,
      nombre: p.nombre,
      name: p.nombre,
      descripcion: p.descripcion,
      description: p.descripcion,
      precio: p.precio,
      price: p.precio,
      imagen: p.imagen,
      image: p.imagen
    }));

    res.json(productosFormateados);
  } catch (err: any) {
    console.error("Error al obtener productos de MongoDB:", err);
    res.status(500).json({ error: err.message });
  }
};
