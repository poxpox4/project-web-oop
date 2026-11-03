// src/lib/rootOfEquationProblem.js
import { Problem } from "./problem.js";
import { ProblemType } from "./enums.js";
import { Equation } from "./equation.js";
import { SolverError } from "./errors.js";

/**
 * โจทย์หารากของสมการที่ต้องใช้ "ช่วง" XL - XR (Closed methods)
 * ใช้กับ Bisection และ False Position
 */
export class RootOfEquationProblem extends Problem {
    constructor(input) {
        // ไม่ต้องรับ problemType จากข้างนอก เรียก super constructor ได้เลย
        super(input, ProblemType.ROOT_OF_EQUATION);
    }

    formatInput() {
        const { fx, xl, xr, error } = this.getInput();
        if (!fx || !xl || !xr || !error) {
            throw new SolverError("กรุณากรอก f(x), XL, XR และ ERROR ให้ครบก่อนคำนวณ");
        }
        return {
            equation: new Equation(fx),
            xl: parseFloat(xl),
            xr: parseFloat(xr),
            error: parseFloat(error),
        };
    }
}

/**
 * โจทย์หารากของสมการที่ใช้ "จุดเริ่มต้น" X0 จุดเดียว (Open methods)
 * ใช้กับ One-point Iteration
 */
export class OpenRootOfEquationProblem extends Problem {
    constructor(input) {
        super(input, ProblemType.ROOT_OF_EQUATION);
    }

    formatInput() {
        const { fx, x0, error } = this.getInput();
        if (!fx || !x0 || !error) {
            throw new SolverError("กรุณากรอก f(x), X Start และ ERROR ให้ครบก่อนคำนวณ");
        }
        return {
            equation: new Equation(fx),
            x0: parseFloat(x0),
            error: parseFloat(error),
        };
    }
}
