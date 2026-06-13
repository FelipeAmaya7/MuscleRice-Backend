# 🏋️ ServiceMuscleRice — Backend API

REST API del proyecto **MuscleRice**, una tienda de suplementos deportivos. Construida con **Node.js**, **Express** y **TypeScript**, conectada a una base de datos **MySQL**.

---

## 🧱 Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| TypeScript | ^6.0 | Lenguaje |
| Express | ^5.1 | Framework HTTP |
| MySQL2 | ^3.15 | Base de datos |
| bcryptjs | ^3.0 | Hash de contraseñas |
| dotenv | ^17 | Variables de entorno |
| tsx | ^4.22 | Compilación en dev |

---

## 📁 Estructura del Proyecto

```
ServiceMuscleRice/
├── src/
│   ├── config/          # Configuración de DB y servidor
│   ├── controllers/     # Lógica de negocio
│   │   ├── authController.ts
│   │   └── productController.ts
│   ├── routes/          # Definición de endpoints
│   │   ├── authRoutes.ts
│   │   └── productRoutes.ts
│   └── server.ts        # Entry point de la aplicación
├── middlewares/         # Middlewares personalizados
├── dist/                # Build compilado (generado)
├── schema.sql           # Esquema de la base de datos
├── .env.example         # Variables de entorno de referencia
├── package.json
└── tsconfig.json
```

---

## 🗄️ Base de Datos

El proyecto usa **MySQL**. El esquema se encuentra en [`schema.sql`](./schema.sql) e incluye las siguientes tablas:

| Tabla | Descripción |
|---|---|
| `clientes` | Usuarios registrados en la tienda |
| `productos` | Catálogo de suplementos |
| `pedidos` | Órdenes realizadas por los clientes |
| `detalle_pedido` | Ítems individuales dentro de cada pedido |
| `pagos` | Registro de pagos por pedido |

El archivo `schema.sql` también incluye **semilla de productos** iniciales.

---

## ⚙️ Configuración del Entorno

1. Copia el archivo de ejemplo y completa tus credenciales:

```bash
cp .env.example .env
```

2. Edita `.env` con tus valores:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_aqui
DB_NAME=musclericedb
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- MySQL corriendo localmente

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Crear la base de datos
mysql -u root -p < schema.sql

# 3. Configurar variables de entorno
cp .env.example .env
# (editar .env con tus credenciales)

# 4. Iniciar en modo desarrollo
npm run dev
```

El servidor correrá en `http://localhost:3000`

### Build para producción

```bash
npm run build    # Compila TypeScript a dist/
npm start        # Ejecuta el build compilado
```

---

## 📡 Endpoints de la API

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de nuevo cliente |
| `POST` | `/api/auth/login` | Inicio de sesión |

### Productos

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/products` | Listar todos los productos |
| `GET` | `/api/products/:id` | Obtener producto por ID |

---

## 🛡️ Seguridad

- Las contraseñas se almacenan encriptadas con **bcryptjs**
- Las variables sensibles se manejan via `.env` (nunca se suben al repositorio)
- CORS habilitado para el frontend

---

## 👤 Autor

**Felipe Amaya** — Proyecto académico MuscleRice
