import joi from "joi";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../databases/db.js";
import dayjs from "dayjs";

export function entry(req, res) {
    const { value, description, type } = req.body;
    const entrySchema = joi.object({
        value: joi.string().required(),
        description: joi.string().required()
    })

    const validate = entrySchema.validate(req.body);
    if (validate.error) {
        console.log(validate.error.details);
        res.status(422).send("Favor preecher os campos corretamente");
        return;
    }
    db.collection("MyWalletData").insertOne({
        value,
        description,
        type,
        date: `${dayjs().format("DD")}/${dayjs().format("MM")}`
    });
    res.sendStatus(201);
}

export async function getEntry(req, res) {
    const { token } = req.headers;
    try {

        const entries = await db.collection("MyWalletData").find().toArray()
        res.send(entries);
    } catch (error) {
        res.status(500).send("get entry error");
    }
}
export async function out(req, res) {
    
}