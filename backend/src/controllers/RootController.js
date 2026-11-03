// backend/src/controllers/RootController.js

/** จัดการ request ของ /root (รับ req → เรียก repository → ตอบ res) */
export class RootController {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    // arrow function เพื่อให้ `this` ยังชี้มาที่ object นี้ตอนส่งไปให้ Express
    getAll = async (req, res) => {
        try {
            const rows = await this.#repository.findRandomEquations();
            res.json(rows);
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ message: "Database error" });
        }
    };

    create = async (req, res) => {
        const equation = req.body?.equation;
        if (typeof equation !== "string" || equation.trim() === "") {
            return res.status(400).json({ message: "equation is required" });
        }

        try {
            const insertedId = await this.#repository.create(equation);
            res.json({
                success: true,
                message: "Inserted successfully",
                insertedId,
            });
        } catch (error) {
            console.error("Error inserting data:", error);
            res.status(500).json({ message: "Database insert error" });
        }
    };
}
