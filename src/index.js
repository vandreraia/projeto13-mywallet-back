import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createUser, loginUser } from "./controllers/userController.js"
import {entry, getEntry} from "./controllers/dataController.js"
import validateUser from "./middlewares/validateUser.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

server.post('/login', loginUser);
server.post('/sign-up', createUser);

server.post("/entry", entry);
server.get("/entry", getEntry);

server.listen(5000, () => {
    console.log("Rodando em http://localhost:5000");
});