// src/lib/problem.js
import { SolverError } from "./errors.js";

/**
 * Problem (abstract)
 * เก็บรายละเอียดของ "โจทย์" ที่ผู้ใช้ถามมา
 *  - input       : ข้อมูลดิบจากฟอร์ม
 *  - problemType : ประเภทของปัญหา (ProblemType)
 *
 * คลาสลูก (เช่น RootOfEquationProblem) ต้อง implement formatInput()
 * เพื่อตรวจสอบและแปลงข้อมูลให้พร้อมคำนวณ
 */
export class Problem {
    // Encapsulation: ซ่อน attribute ไว้ ใช้ผ่าน getter เท่านั้น
    #input;
    #problemType;

    constructor(input, problemType) {
        if (new.target === Problem) {
            throw new TypeError("Problem เป็น abstract class สร้าง object โดยตรงไม่ได้");
        }
        this.#input = input;
        this.#problemType = problemType;
    }

    getInput() {
        return { ...this.#input };
    }

    getProblemType() {
        return this.#problemType;
    }

    /** @abstract ตรวจสอบ + แปลงข้อมูลที่ผู้ใช้กรอก ให้ตรงกับปัญหาที่ถาม */
    formatInput() {
        throw new Error(`${this.constructor.name} ต้อง implement formatInput()`);
    }
}

/**
 * ProblemSolver (abstract)
 * เก็บ "วิธีการแก้ปัญหา" ของ Problem หนึ่งๆ
 *  - problem      : Problem ที่กำลังจะแก้ (Composition)
 *  - solutionType : วิธีการแก้ปัญหา (SolutionType)
 *
 * คลาสลูก (เช่น BisectionSolver) ต้อง implement getOutput()
 */
export class ProblemSolver {
    #problem;
    #solutionType;

    constructor(problem, solutionType) {
        if (new.target === ProblemSolver) {
            throw new TypeError("ProblemSolver เป็น abstract class สร้าง object โดยตรงไม่ได้");
        }
        if (!(problem instanceof Problem)) {
            throw new TypeError("problem ต้องเป็น object ของคลาสที่สืบทอดจาก Problem");
        }
        this.#problem = problem;
        this.#solutionType = solutionType;
    }

    // ---- protected-style getters (ให้คลาสลูกใช้) ----
    getProblem() {
        return this.#problem;
    }

    getSolutionType() {
        return this.#solutionType;
    }

    /** จำนวนรอบสูงสุดที่ยอมให้วนซ้ำ (คลาสลูก override ได้) */
    get maxIterations() {
        return 1000;
    }

    /** ข้อความที่แจ้งผู้ใช้เมื่อวนซ้ำเกินกำหนด (คลาสลูก override ได้) */
    get iterationLimitMessage() {
        return "ทำงานเยอะเกิน ลองเปลี่ยนค่าเริ่มต้นหรือ f(x) ใหม่";
    }

    /** เรียกทุกรอบของ loop เพื่อกันไม่ให้วนไม่รู้จบ */
    assertWithinLimit(iterationCount) {
        if (iterationCount > this.maxIterations) {
            throw new SolverError(this.iterationLimitMessage);
        }
    }

    /**
     * @abstract คำนวณและส่งคำตอบ
     * @returns {{ result: number, iterations: object[] }}
     */
    getOutput() {
        throw new Error(`${this.constructor.name} ต้อง implement getOutput()`);
    }
}
