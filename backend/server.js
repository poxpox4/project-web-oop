import { Server } from "./src/Server.js";
import { Database } from "./src/Database.js";

const server = new Server({ port: 5000, database: new Database() });
server.start();
