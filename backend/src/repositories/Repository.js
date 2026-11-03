// backend/src/repositories/Repository.js

/**
 * Repository (abstract)
 * คลาสแม่ของทุกตารางในฐานข้อมูล เก็บ Database และชื่อตารางไว้ (Encapsulation)
 * คลาสลูกต้อง implement create() เพราะแต่ละตารางมีคอลัมน์ไม่เหมือนกัน
 */
export class Repository {
    #db;
    #table;

    constructor(db, table) {
        if (new.target === Repository) {
            throw new TypeError("Repository เป็น abstract class สร้าง object โดยตรงไม่ได้");
        }
        this.#db = db;
        this.#table = table;
    }

    get db() {
        return this.#db;
    }

    get table() {
        return this.#table;
    }

    async findRandom(limit) {
        return this.#db.query(`SELECT * FROM \`${this.#table}\` ORDER BY RAND() LIMIT ?`, [limit]);
    }

    /** @abstract */
    async create() {
        throw new Error(`${this.constructor.name} ต้อง implement create()`);
    }
}
