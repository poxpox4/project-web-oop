// src/lib/solvers/falsePositionSolver.js
import { ProblemSolver } from "../problem.js";
import { SolutionType } from "../enums.js";

export class FalsePositionSolver extends ProblemSolver {
    constructor(problem) {
        super(problem, SolutionType.FALSE_POSITION);
    }

    getOutput() {
        const { equation, xl, xr, error } = this.getProblem().formatInput();

        let xlcal = xl;
        let xrcal = xr;
        let fxl = equation.evaluate(xlcal);
        let fxr = equation.evaluate(xrcal);
        let x1 = (fxr * xlcal - fxl * xrcal) / (fxr - fxl);
        let fx1 = equation.evaluate(x1);
        let x1old = 0;
        const iterations = [];

        do {
            const errorcal = Math.abs((x1 - x1old) / x1);
            iterations.push({
                xl: xlcal,
                xr: xrcal,
                fxl, fxr, x1, fx1, error: errorcal,
            });
            this.assertWithinLimit(iterations.length);

            x1old = x1;
            if (fxl * fx1 > 0) {
                xlcal = x1;
            } else {
                xrcal = x1;
            }

            fxl = equation.evaluate(xlcal);
            fxr = equation.evaluate(xrcal);
            x1 = (fxr * xlcal - fxl * xrcal) / (fxr - fxl);
            fx1 = equation.evaluate(x1);
        } while (Math.abs((x1 - x1old) / x1) > error && Math.abs(fx1) > error);

        return { result: x1, iterations };
    }
}
