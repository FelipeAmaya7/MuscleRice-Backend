-- MuscleRice Database Schema
-- Base de datos: musclericedb
-- ==========================================

CREATE DATABASE IF NOT EXISTS musclericedb;
USE musclericedb;

-- 1. Tabla de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  imagen VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabla de Pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabla de Detalle del Pedido
CREATE TABLE IF NOT EXISTS detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  precio_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabla de Pagos
CREATE TABLE IF NOT EXISTS pagos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  monto DECIMAL(10,2) NOT NULL,
  metodo VARCHAR(50) NOT NULL,
  estado VARCHAR(50) DEFAULT 'aprobado',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================================
-- INSERCIÓN DE PRODUCTOS INICIALES (Semilla)
-- ==========================================

INSERT INTO productos (nombre, descripcion, precio, imagen) VALUES
('Proteína Whey (2 LB)', 'Ideal para aumentar masa muscular y mejorar la recuperación.', 160000.00, 'img/whey protein.jpg'),
('Creatina Monohidratada Creapure (300g)', 'Perfecta para mejorar la fuerza y el rendimiento físico.', 95000.00, 'img/Creatina Monohidratada Creapure (300g).jpg'),
('Colágeno Hidrolizado con Magnesio (300g)', 'Apoya tus articulaciones, piel y cabello.', 85000.00, 'img/Colágeno Hidrolizado con Magnesio (300g).jpg'),
('Proteína Vegetal (Vega 2 LB)', 'Proteína de origen vegetal premium, sin gluten ni soya.', 135000.00, 'img/Proteína Vegetal (Orgain o Vega 2lb).jpg'),
('Barra Proteica Quest (por diez und)', 'Snack nutritivo con alto contenido de proteína.', 90000.00, 'img/Barra Proteica Quest (por unidad) (1).jpg'),
('Pre-entreno C4 Original (30 servicios)', 'Aumenta tu energía y enfoque para entrenar duro.', 125000.00, 'img/Pre-entreno C4 Original (30 servicios).jpg'),
('Quemador de grasa Lipo6 (60 cápsulas)', 'Acelera el metabolismo y ayuda a quemar grasa acumulada.', 105000.00, 'img/Quemador de grasa Lipo6 (60 cápsulas).jpg'),
('Avena + Proteína (mezcla lista 1kg)', 'Mezcla perfecta para desayunos o batidos energéticos.', 55000.00, 'img/Avena + Proteína (mezcla lista 1kg).jpg')
ON DUPLICATE KEY UPDATE nombre=nombre;
