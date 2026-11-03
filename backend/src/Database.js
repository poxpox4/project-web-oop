// backend/src/Database.js
import mysql from "mysql2/promise";

/**
 * ห่อการเชื่อมต่อ MySQL ไว้ในคลาสเดียว
 * - ใช้ connection pool (ไม่ล้มถ้า MySQL ยังไม่พร้อมตอน backend เริ่มทำงาน)
 * - ค่า default ตรงกับ docker-compose.yml เดิม
 */
export class Database {
    #pool;

    constructor(config = {}) {
        this.#pool = mysql.createPool({
            host: config.host ?? process.env.DB_HOST ?? "mysql",
            user: config.user ?? process.env.DB_USER ?? "user",
            password: config.password ?? process.env.DB_PASSWORD ?? "numerja",
            port: config.port ?? Number(process.env.DB_PORT ?? 3306),
            database: config.database ?? process.env.DB_NAME ?? "numer",
        });
    }

    /** @returns rows (SELECT) หรือ ResultSetHeader (INSERT/UPDATE) */
    async query(sql, params = []) {
        const [rows] = await this.#pool.query(sql, params);
        return rows;
    }
}
