import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import validateUser from "./middlewares/validateUser.js";
import userRouter from "./routes/userRouter.js";
import dataRouter from "./routes/dataRouter.js";

dotenv.config();

const server = express();
server.use(cors());
server.use(json());

server.use(userRouter);
server.use(dataRouter);

server.listen(5000, () => {
    console.log("Rodando em http://localhost:5000");
});