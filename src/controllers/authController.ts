import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const registro = async (req: Request, res: Response) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO clientes (nombre, email, password)
      VALUES (?, ?, ?)
    `;

    const [result] = await db.query<ResultSetHeader>(query, [nombre, email, hashedPassword]);

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      id: result.insertId
    });

  } catch (err: any) {
    console.error("Error en registro:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        mensaje: "Este correo ya está registrado"
      });
    }
    return res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: "El correo y contraseña son obligatorios" });
  }

  try {
    const query = `
      SELECT id, nombre, email, password
      FROM clientes
      WHERE email = ?
    `;

    const [results] = await db.query<RowDataPacket[]>(query, [email]);

    if (results.length === 0) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos"
      });
    }

    const usuario = results[0];

    // Verificar contraseña usando bcrypt, con fallback a texto plano para usuarios legacy
    let passwordCorrect = false;
    const isBcryptHash = usuario.password.startsWith('$2a$') || usuario.password.startsWith('$2b$');

    if (isBcryptHash) {
      passwordCorrect = await bcrypt.compare(password, usuario.password);
    } else {
      passwordCorrect = (password === usuario.password);

      if (passwordCorrect) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          await db.query("UPDATE clientes SET password = ? WHERE id = ?", [hashedPassword, usuario.id]);
          console.log(`🔑 Contraseña de usuario legacy (ID: ${usuario.id}) migrada a bcrypt con éxito.`);
        } catch (updateErr) {
          console.error("Error al actualizar la contraseña legacy:", updateErr);
        }
      }
    }

    if (!passwordCorrect) {
      return res.status(401).json({
        mensaje: "Correo o contraseña incorrectos"
      });
    }

    return res.json({
      mensaje: "Login exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (err: any) {
    console.error("Error en login:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT id, nombre, email
      FROM clientes
      WHERE id = ?
    `;

    const [results] = await db.query<RowDataPacket[]>(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    return res.json(results[0]);

  } catch (err: any) {
    console.error("Error al obtener usuario:", err);
    return res.status(500).json({ error: err.message });
  }
};
