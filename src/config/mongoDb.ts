import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("❌ MONGO_URI no está configurada en las variables de entorno (.env)");
    }

    await mongoose.connect(mongoUri);
    console.log("🍃 Conexión exitosa a MongoDB Atlas!");
  } catch (error: any) {
    console.error("❌ Error al conectar a MongoDB Atlas:", error.message);
  }
};
