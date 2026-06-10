import express from 'express';
import { registro, login, getUsuario } from '../controllers/authController.js';
const router = express.Router();
router.post('/registro', registro);
router.post('/login', login);
router.get('/usuario/:id', getUsuario);
export default router;
