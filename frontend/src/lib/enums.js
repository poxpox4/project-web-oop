// src/lib/enums.js
// ประเภทของปัญหา และวิธีการแก้ปัญหา (เหมือน <<enumeration>> ใน Class Diagram)

export const ProblemType = Object.freeze({
    ROOT_OF_EQUATION: "ROOT_OF_EQUATION",
});

export const SolutionType = Object.freeze({
    BISECTION: "BISECTION",
    FALSE_POSITION: "FALSE_POSITION",
    ONE_POINT_ITERATION: "ONE_POINT_ITERATION",
});
