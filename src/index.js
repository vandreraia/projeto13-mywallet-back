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

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log("Rodando na porta " + PORT);
});