import express from 'express';
import { getProductos, getPedidos, getDetallePedido, getPagos } from '../controllers/productController.js';
const router = express.Router();
router.get('/productos', getProductos);
router.get('/pedidos', getPedidos);
router.get('/detalle-pedido', getDetallePedido);
router.get('/pagos', getPagos);
export default router;
