import db from '../config/db.js';
export const getProductos = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM productos");
        res.json(results);
    }
    catch (err) {
        console.error("Error al obtener productos:", err);
        res.status(500).json({ error: err.message });
    }
};
export const getPedidos = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM pedidos");
        res.json(results);
    }
    catch (err) {
        console.error("Error al obtener pedidos:", err);
        res.status(500).json({ error: err.message });
    }
};
export const getDetallePedido = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM detalle_pedido");
        res.json(results);
    }
    catch (err) {
        console.error("Error al obtener detalle_pedido:", err);
        res.status(500).json({ error: err.message });
    }
};
export const getPagos = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM pagos");
        res.json(results);
    }
    catch (err) {
        console.error("Error al obtener pagos:", err);
        res.status(500).json({ error: err.message });
    }
};
