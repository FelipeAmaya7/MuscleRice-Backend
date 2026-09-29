# 🏋️ MuscleRice — Backend (API)

API REST de **MuscleRice**, tienda online de suplementos deportivos en Colombia.
Construida con **Node.js + Express + TypeScript** y conectada a **MongoDB Atlas** mediante **Mongoose**.

> 🔗 Frontend: [MuscleRice](https://github.com/FelipeAmaya7/MuscleRice)

---

## 📑 Índice
1. [¿Qué hace este backend?](#-qué-hace-este-backend)
2. [Stack tecnológico](#-stack-tecnológico)
3. [Estructura del proyecto](#-estructura-del-proyecto)
4. [Cómo funciona una petición](#-cómo-funciona-una-petición)
5. [Modelos de datos](#-modelos-de-datos)
6. [Endpoints](#-endpoints)
7. [Instalación y ejecución](#-instalación-y-ejecución)
8. [Estado actual y pendientes](#-estado-actual-y-pendientes)

---

## 🎯 ¿Qué hace este backend?

Es la "cocina" de la tienda: el navegador **nunca** habla directo con la base de datos, siempre pasa por aquí.

- Entrega el catálogo de productos desde MongoDB
- Registra usuarios y valida su inicio de sesión (contraseñas encriptadas con bcrypt)
- En producción, también sirve el frontend compilado (`WebsiteMuscleRice/dist`) como SPA

---

## 🧱 Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Node.js** (≥ 18) | Entorno para ejecutar JavaScript en el servidor |
| **Express 5** | Framework HTTP: rutas, middlewares, respuestas JSON |
| **TypeScript** | Tipado estático; se compila a `dist/` |
| **MongoDB Atlas** | Base de datos en la nube (documentos JSON) |
| **Mongoose** | Define esquemas/modelos y consulta MongoDB |
| **bcryptjs** | Hash de contraseñas |
| **cors** | Permite que el frontend (otro puerto/dominio) llame a la API |
| **dotenv** | Carga variables secretas desde `.env` |
| **tsx** | Ejecuta TypeScript directo en desarrollo |

---

## 📁 Estructura del proyecto

```
ServiceMuscleRice/
├── src/
│   ├── server.ts               # Punto de entrada: crea Express, conecta Mongo, registra rutas
│   ├── config/
│   │   └── mongoDb.ts          # Conexión a MongoDB Atlas (usa MONGO_URI)
│   ├── models/                 # "Moldes" de los datos (esquemas de Mongoose)
│   │   ├── Product.ts
│   │   ├── User.ts
│   │   └── Order.ts            # Definido, aún sin rutas
│   ├── routes/                 # Qué URL ejecuta qué función
│   │   ├── productRoutes.ts
│   │   └── authRoutes.ts
│   └── controllers/            # Lógica de cada endpoint
│       ├── productController.ts
│       └── authController.ts
├── seedMongo.js                # Carga los productos iniciales en MongoDB
├── .env.example                # Plantilla de variables de entorno
├── tsconfig.json
└── package.json
```

**Patrón usado:** `routes → controllers → models`
- **Route:** "cuando llegue `GET /api/productos`, llama a `getProductos`"
- **Controller:** "busca los productos, dales formato y responde"
- **Model:** "así es un producto y así se consulta en MongoDB"

---

## 🔄 Cómo funciona una petición

```
Frontend: fetch('/api/productos')
      │
      ▼
server.ts            → app.use('/api', productRoutes)
      │
      ▼
productRoutes.ts     → router.get('/productos', getProductos)
      │
      ▼
productController.ts → await Product.find({})
      │
      ▼
MongoDB Atlas        → devuelve los documentos
      │
      ▼
productController.ts → res.json([...])  ──▶ vuelve al frontend
```

---

## 🗄️ Modelos de datos

### Product
| Campo | Tipo | Requerido |
|---|---|---|
| `nombre` | String | ✅ |
| `descripcion` | String | ✅ |
| `precio` | Number (COP) | ✅ |
| `imagen` | String (ruta, ej. `img/whey protein.jpg`) | ✅ |
| `createdAt` / `updatedAt` | Date | automático |

### User
| Campo | Tipo | Notas |
|---|---|---|
| `nombre` | String | requerido |
| `email` | String | requerido, **único** |
| `password` | String | se guarda **hasheado** con bcrypt, nunca en texto plano |

### Order *(aún sin endpoints)*
| Campo | Tipo |
|---|---|
| `clienteEmail` | String |
| `total` | Number |
| `estado` | `pendiente` · `pagado` · `enviado` |
| `productos[]` | `{ productoNombre, cantidad, precioUnitario }` |

---

## 📡 Endpoints

Todas las rutas empiezan por `/api`.

### Productos
| Método | Ruta | Descripción | Respuesta |
|---|---|---|---|
| `GET` | `/api/productos` | Lista todos los productos | `200` · arreglo de productos |

### Autenticación
| Método | Ruta | Body | Respuestas |
|---|---|---|---|
| `POST` | `/api/registro` | `{ nombre, email, password }` | `201` creado · `400` faltan campos · `409` correo ya existe |
| `POST` | `/api/login` | `{ email, password }` | `200` login ok · `400` faltan campos · `401` credenciales incorrectas |
| `GET` | `/api/usuario/:id` | — | `200` usuario (sin password) · `404` no existe |

**Ejemplo — login:**
```http
POST /api/login
Content-Type: application/json

{ "email": "cliente@correo.com", "password": "secreta123" }
```
```json
{
  "mensaje": "Login exitoso",
  "usuario": { "id": "66f...", "nombre": "Cliente", "email": "cliente@correo.com" }
}
```

---

## 🚀 Instalación y ejecución

### Requisitos
- Node.js 18 o superior
- Un cluster de **MongoDB Atlas** (gratis) y su cadena de conexión

### Pasos
```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno
cp .env.example .env
#    y completar MONGO_URI con tu cadena de Atlas

# 3. Modo desarrollo (recarga con tsx)
npm run dev          # → http://localhost:3000
```

### Cargar productos iniciales (solo la primera vez)
`seedMongo.js` importa el modelo compilado, así que primero se compila:
```bash
npm run build
node seedMongo.js    # ⚠️ borra y vuelve a crear la colección de productos
```

### Producción
```bash
npm run build        # compila src/ → dist/
npm start            # node dist/server.js
```
Si existe `../WebsiteMuscleRice/dist`, el servidor también entrega el frontend y redirige cualquier ruta desconocida a `index.html` (necesario para React Router).

### Variables de entorno
| Variable | Ejemplo | Descripción |
|---|---|---|
| `PORT` | `3000` | Puerto del servidor |
| `MONGO_URI` | `mongodb+srv://usuario:clave@cluster.mongodb.net/musclerice` | Conexión a MongoDB Atlas |

> 🔒 El archivo `.env` está en `.gitignore`: **nunca** se sube a GitHub.

---

## 📌 Estado actual y pendientes

### ✅ Hecho
- Migración de MySQL a **MongoDB + Mongoose**
- Catálogo servido desde la base de datos
- Registro y login con contraseñas hasheadas

### 🛠️ Pendiente (ver plan del proyecto)
- [ ] `GET /api/productos/:id` para la ficha de producto
- [ ] Más campos en `Product`: categoría, marca, stock, precio anterior, registro INVIMA
- [ ] **JWT** en login/registro + middleware que proteja rutas privadas
- [ ] Proteger `GET /api/usuario/:id` (hoy es público) → reemplazar por `GET /api/usuario/me`
- [ ] Endpoints de pedidos: `POST /api/pedidos` (recalculando precios en el servidor) y `GET /api/pedidos/mios`
- [ ] Limitar CORS al dominio del frontend y no exponer `err.message` en errores 500
- [ ] Validación de datos de entrada

---

## 👤 Autor

**Felipe Amaya** — Proyecto académico MuscleRice
