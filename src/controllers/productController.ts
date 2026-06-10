import { Request, Response } from 'express';
import db from '../config/db.js';
import { RowDataPacket } from 'mysql2';

export const getProductos = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query<RowDataPacket[]>("SELECT * FROM productos");
    res.json(results);
  } catch (err: any) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getPedidos = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query<RowDataPacket[]>("SELECT * FROM pedidos");
    res.json(results);
  } catch (err: any) {
    console.error("Error al obtener pedidos:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getDetallePedido = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query<RowDataPacket[]>("SELECT * FROM detalle_pedido");
    res.json(results);
  } catch (err: any) {
    console.error("Error al obtener detalle_pedido:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getPagos = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query<RowDataPacket[]>("SELECT * FROM pagos");
    res.json(results);
  } catch (err: any) {
    console.error("Error al obtener pagos:", err);
    res.status(500).json({ error: err.message });
  }
};
