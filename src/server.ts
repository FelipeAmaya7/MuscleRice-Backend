import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Importar rutas y configuración de MongoDB
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { connectMongoDB } from "./config/mongoDb.js";

// Configurar variables de entorno
dotenv.config();

// Conectar a MongoDB Atlas
connectMongoDB();

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

// Rutas de la API (bajo /api)
app.use("/api", authRoutes);
app.use("/api", productRoutes);

// Servir la versión compilada (dist) si existe, de lo contrario la carpeta raíz del frontend
const staticDir = fs.existsSync(path.join(frontendDir, "dist"))
  ? path.join(frontendDir, "dist")
  : frontendDir;

console.log(`📂 Serviendo archivos estáticos desde: ${staticDir}`);
app.use(express.static(staticDir));

// Servir el index.html para cualquier otra ruta (manejo de rutas en el cliente - SPA)
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
