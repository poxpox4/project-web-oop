// src/lib/equation.js
import { evaluate } from "mathjs";

/**
 * ห่อสมการ f(x) ที่ผู้ใช้พิมพ์เข้ามา (string) ให้กลายเป็นวัตถุที่เรียก evaluate(x) ได้
 * - ตัวแปรของสมการ จะใช้ตัวอักษรตัวสุดท้ายที่พบในสมการ (เหมือนโค้ดเดิม)
 * - ถูกนำไปเป็น Attribute ของ Problem (Composition)
 */
export class Equation {
    #expression;
    #variable;

    constructor(expression) {
        this.#expression = expression;
        const matches = expression.match(/[a-zA-Z]+/g);
        this.#variable = matches ? matches[matches.length - 1] : "x";
    }

    get expression() {
        return this.#expression;
    }

    get variable() {
        return this.#variable;
    }

    evaluate(value) {
        return evaluate(this.#expression, { [this.#variable]: value });
    }
}
