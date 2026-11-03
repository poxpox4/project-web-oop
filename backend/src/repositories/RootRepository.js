// backend/src/repositories/RootRepository.js
import { Repository } from "./Repository.js";

/** ตาราง `root` เก็บสมการของปัญหา Root of Equation (ID, Equation) */
export class RootRepository extends Repository {
    static RANDOM_LIMIT = 4;

    constructor(db) {
        super(db, "root");
    }

    async findRandomEquations() {
        return this.findRandom(RootRepository.RANDOM_LIMIT);
    }

    /** @returns {Promise<number>} id ของแถวที่เพิ่งเพิ่ม */
    async create(equation) {
        const result = await this.db.query(
            `INSERT INTO \`${this.table}\` (Equation) VALUES (?)`,
            [equation]
        );
        return result.insertId;
    }
}
