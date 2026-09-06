import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './dist/models/Product.js';

dotenv.config();

const productosIniciales = [
  { nombre: 'Proteína Whey (2 LB)', descripcion: 'Ideal para aumentar masa muscular y mejorar la recuperación.', precio: 160000.00, imagen: 'img/whey protein.jpg' },
  { nombre: 'Creatina Monohidratada Creapure (300g)', descripcion: 'Perfecta para mejorar la fuerza y el rendimiento físico.', precio: 95000.00, imagen: 'img/Creatina Monohidratada Creapure (300g).jpg' },
  { nombre: 'Colágeno Hidrolizado con Magnesio (300g)', descripcion: 'Apoya tus articulaciones, piel y cabello.', precio: 85000.00, imagen: 'img/Colágeno Hidrolizado con Magnesio (300g).jpg' },
  { nombre: 'Proteína Vegetal (Vega 2 LB)', descripcion: 'Proteína de origen vegetal premium, sin gluten ni soya.', precio: 135000.00, imagen: 'img/Proteína Vegetal (Orgain o Vega 2lb).jpg' },
  { nombre: 'Barra Proteica Quest (por diez und)', descripcion: 'Snack nutritivo con alto contenido de proteína.', precio: 90000.00, imagen: 'img/Barra Proteica Quest (por unidad) (1).jpg' },
  { nombre: 'Pre-entreno C4 Original (30 servicios)', descripcion: 'Aumenta tu energía y enfoque para entrenar duro.', precio: 125000.00, imagen: 'img/Pre-entreno C4 Original (30 servicios).jpg' },
  { nombre: 'Quemador de grasa Lipo6 (60 cápsulas)', descripcion: 'Acelera el metabolismo y ayuda a quemar grasa acumulada.', precio: 105000.00, imagen: 'img/Quemador de grasa Lipo6 (60 cápsulas).jpg' },
  { nombre: 'Avena + Proteína (mezcla lista 1kg)', descripcion: 'Mezcla perfecta para desayunos o batidos energéticos.', precio: 55000.00, imagen: 'img/Avena + Proteína (mezcla lista 1kg).jpg' }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI no encontrada");

    console.log("🍃 Conectando a MongoDB Atlas...");
    await mongoose.connect(mongoUri);

    console.log("🧹 Limpiando colección de productos en MongoDB...");
    await Product.deleteMany({});

    console.log("🌱 Insertando productos iniciales...");
    await Product.insertMany(productosIniciales);

    console.log("🎉 ¡Productos cargados con éxito en MongoDB Atlas!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en sembrado de MongoDB:", error);
    process.exit(1);
  }
}

seed();
