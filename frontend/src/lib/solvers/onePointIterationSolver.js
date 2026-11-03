// src/lib/solvers/onePointIterationSolver.js
import { ProblemSolver } from "../problem.js";
import { SolutionType } from "../enums.js";
import { SolverError } from "../errors.js";

export class OnePointIterationSolver extends ProblemSolver {
    constructor(problem) {
        super(problem, SolutionType.ONE_POINT_ITERATION);
    }

    // Polymorphism: override ค่าเริ่มต้นของคลาสแม่ ให้วนได้สูงสุด 100 รอบ (เหมือนโค้ดเดิม)
    get maxIterations() {
        return 100;
    }

    get iterationLimitMessage() {
        return "ทำงานเยอะเกิน ใส่ X start หรือ f(x) ใหม่";
    }

    getOutput() {
        const { equation, x0, error } = this.getProblem().formatInput();

        let x0cal = x0;
        let xold = 0;
        let x1 = 0;
        const iterations = [];

        do {
            xold = x0cal;
            x1 = equation.evaluate(x0cal);
            if (x1 === 0) {
                throw new SolverError("X Start ต้องไม่เท่ากับ 0 ใส่ X Start ใหม่");
            }
            const errorcal = Math.abs((x1 - xold) / x1);
            iterations.push({
                x0: x0cal,
                x1, error: errorcal,
            });

            x0cal = x1;
            this.assertWithinLimit(iterations.length);
        } while (Math.abs((x1 - xold) / x1) > error);

        return { result: x1, iterations };
    }
}
