// backend/src/Server.js
import express from "express";
import cors from "cors";
import { RootRepository } from "./repositories/RootRepository.js";
import { RootController } from "./controllers/RootController.js";

/** ประกอบ Express app: middleware + routes + เริ่มรับ request */
export class Server {
    #app;
    #port;
    #rootController;

    constructor({ port, database }) {
        this.#port = port;
        this.#app = express();
        // Composition: Server → Controller → Repository → Database
        this.#rootController = new RootController(new RootRepository(database));

        this.#setupMiddleware();
        this.#setupRoutes();
    }

    get app() {
        return this.#app;
    }

    #setupMiddleware() {
        this.#app.use(cors());
        this.#app.use(express.json());
    }

    #setupRoutes() {
        this.#app.get("/root", this.#rootController.getAll);
        this.#app.post("/root", this.#rootController.create);
    }

    start() {
        return this.#app.listen(this.#port, () => {
            console.log("server started");
        });
    }
}
