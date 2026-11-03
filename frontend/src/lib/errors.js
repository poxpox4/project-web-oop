// src/lib/errors.js

/**
 * ข้อผิดพลาดที่เราตั้งใจโยนเอง และมีข้อความที่พร้อมแสดงให้ผู้ใช้เห็นได้เลย
 * (เช่น กรอกข้อมูลไม่ครบ, วนซ้ำเกินกำหนด)
 * ส่วน Error อื่นๆ (เช่น mathjs parse สมการไม่ได้) จะถือว่า "สมการผิด"
 */
export class SolverError extends Error {
    constructor(message) {
        super(message);
        this.name = "SolverError";
    }
}
