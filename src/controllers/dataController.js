import joi from "joi";
import db from "../databases/db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

export function entry(req, res) {
    const session = res.locals.session;
    const { description, type } = req.body;
    const value = parseInt(req.body.value);
    
    const entrySchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required(),
        type: joi.string().required()
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
        date: `${dayjs().format("DD")}/${dayjs().format("MM")}`,
        userId: session.userId
    });
    res.sendStatus(201);
}

export async function getEntry(req, res) {
    const session = res.locals.session;
    console.log(session)
    try {

        const entries = await db.collection("MyWalletData").find({userId: new ObjectId(session.userId)}).toArray()
        res.send(entries);
    } catch (error) {
        res.status(500).send("get entry error");
    }
}
export async function out(req, res) {

}