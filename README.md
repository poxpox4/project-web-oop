# Numerical Method – Root of Equation (OOP)

เว็บคำนวณหารากของสมการ 3 วิธี: **Bisection**, **False Position**, **One-point Iteration**

รันด้วย `docker compose up --build` (frontend `:5173`, backend `:5000`, phpMyAdmin `:8081`)

## โครงสร้าง OOP

```
frontend/src/lib/
├── enums.js                    ProblemType, SolutionType
├── errors.js                   SolverError (ข้อความที่แสดงให้ผู้ใช้ได้)
├── equation.js                 Equation        – ห่อ f(x) + evaluate(x)
├── problem.js                  Problem  (abstract)  ← โจทย์
│                               ProblemSolver (abstract) ← วิธีแก้
├── rootOfEquationProblem.js    RootOfEquationProblem      extends Problem  (XL, XR)
│                               OpenRootOfEquationProblem  extends Problem  (X0)
├── solvers/
│   ├── bisectionSolver.js          BisectionSolver          extends ProblemSolver
│   ├── falsePositionSolver.js      FalsePositionSolver      extends ProblemSolver
│   └── onePointIterationSolver.js  OnePointIterationSolver  extends ProblemSolver
└── equationService.js          EquationService – client เรียก /root

backend/
├── server.js                   entry point
└── src/
    ├── Server.js               ประกอบ Express app
    ├── Database.js             MySQL pool
    ├── repositories/
    │   ├── Repository.js       (abstract)
    │   └── RootRepository.js   extends Repository (ตาราง root)
    └── controllers/RootController.js
```

| แนวคิด | ตัวอย่างในโค้ด |
|---|---|
| Constructor | `RootOfEquationProblem` เรียก `super(input, ProblemType.ROOT_OF_EQUATION)` |
| Encapsulation | attribute เป็น private (`#input`, `#problem`, `#pool`) เข้าถึงผ่าน getter |
| Composition | `ProblemSolver` มี `Problem`, `Problem` มี `Equation`, `Server` → `Controller` → `Repository` → `Database` |
| Abstract & Inheritance | `Problem.formatInput()`, `ProblemSolver.getOutput()`, `Repository.create()` |
| Polymorphism | ทุก Solver ถูกเรียกด้วย `getOutput()` เหมือนกัน; `OnePointIterationSolver` override `maxIterations` |

ลำดับการทำงานของแต่ละหน้า: `new RootOfEquationProblem({...})` → `new BisectionSolver(problem)` → `solver.getOutput()`
