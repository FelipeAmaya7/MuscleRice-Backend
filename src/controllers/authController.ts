import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const registro = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el usuario ya existe en MongoDB
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ mensaje: "Este correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario en MongoDB
    const nuevoUsuario = await User.create({
      nombre,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      id: nuevoUsuario._id,
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });

  } catch (err: any) {
    console.error("Error en registro MongoDB:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: "El correo y contraseña son obligatorios" });
  }

  try {
    // Buscar usuario por email en MongoDB
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
    }

    // Verificar contraseña usando bcrypt
    const passwordCorrect = await bcrypt.compare(password, usuario.password);

    if (!passwordCorrect) {
      return res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
    }

    return res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (err: any) {
    console.error("Error en login MongoDB:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await User.findById(id).select('-password');

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    return res.json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email
    });

  } catch (err: any) {
    console.error("Error al obtener usuario:", err);
    return res.status(500).json({ error: err.message });
  }
};
