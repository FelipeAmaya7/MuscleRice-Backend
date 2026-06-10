import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Importar rutas modularizadas
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import db from "./config/db.js";

// Configurar variables de entorno
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolver ruta del frontend de manera flexible (soportando ts-node y dist)
let frontendDir = path.resolve(__dirname, "../WebsiteMuscleRice");
if (!fs.existsSync(frontendDir)) {
  frontendDir = path.resolve(__dirname, "../../WebsiteMuscleRice");
}

// Servir la versión compilada (dist) si existe, de lo contrario la carpeta raíz del frontend
const staticDir = fs.existsSync(path.join(frontendDir, "dist"))
  ? path.join(frontendDir, "dist")
  : frontendDir;

console.log(`📂 Serviendo archivos estáticos desde: ${staticDir}`);
app.use(express.static(staticDir));

// Rutas de la aplicación (en raíz para compatibilidad con el frontend)
app.use("/", authRoutes);
app.use("/", productRoutes);

// Servir el index.html en la ruta inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

// Ruta de prueba rápida de base de datos
app.get("/prueba", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM clientes LIMIT 5");
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
export default app;
