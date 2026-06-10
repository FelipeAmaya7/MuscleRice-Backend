import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '142005',
    database: process.env.DB_NAME || 'musclericedb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Test connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Conexión exitosa a la base de datos MySQL (Pool)!");
        connection.release();
    }
    catch (err) {
        console.error("❌ Error de conexión a la base de datos:", err.message);
    }
};
testConnection();
export default pool;
