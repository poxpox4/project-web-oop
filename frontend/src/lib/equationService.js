// src/lib/equationService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

/**
 * Client สำหรับคุยกับ backend เพื่อดึง/บันทึกสมการ
 * ทุกหน้า (Bisection, False Position, One-point) ใช้ object ตัวเดียวกันนี้
 */
export class EquationService {
    #client;
    #resource;

    constructor(resource, baseURL = API_BASE_URL) {
        this.#resource = resource;
        this.#client = axios.create({ baseURL });
    }

    async getAll() {
        const res = await this.#client.get(this.#resource);
        return res.data || [];
    }

    async add(equation) {
        const res = await this.#client.post(this.#resource, { equation });
        return res.data;
    }
}

// สมการของปัญหา Root of Equation (ตาราง root)
export const rootEquationService = new EquationService("/root");
