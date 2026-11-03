// src/lib/solvers/bisectionSolver.js
import { ProblemSolver } from "../problem.js";
import { SolutionType } from "../enums.js";

export class BisectionSolver extends ProblemSolver {
    constructor(problem) {
        super(problem, SolutionType.BISECTION);
    }

    getOutput() {
        const { equation, xl, xr, error } = this.getProblem().formatInput();

        let xlcal = xl;
        let xrcal = xr;
        let xmnew = (xlcal + xrcal) / 2;
        let xmold = 0;
        const iterations = [];

        do {
            const fxl = equation.evaluate(xlcal);
            const fxm = equation.evaluate(xmnew);
            const errorcal = Math.abs((xmnew - xmold) / xmnew);
            iterations.push({
                xl: xlcal,
                xr: xrcal,
                xm: xmnew,
                fxl, fxm, error: errorcal,
            });
            this.assertWithinLimit(iterations.length);

            if (fxl * fxm > 0) {
                xlcal = xmnew;
            } else {
                xrcal = xmnew;
            }
            xmold = xmnew;
            xmnew = (xlcal + xrcal) / 2;
        } while (
            Math.abs((xmnew - xmold) / xmnew) > error &&
            Math.abs(equation.evaluate(xmnew)) > error
        );

        return { result: xmnew, iterations };
    }
}
