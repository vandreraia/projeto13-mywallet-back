import joi from "joi";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from "../databases/db.js";

export async function createUser(req, res) {

    const { name, email, password } = req.body;
    const cryptoPassword = bcrypt.hashSync(password, 10);

    const participantSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    })

    const validate = participantSchema.validate(req.body);
    if (validate.error) {
        console.log(validate.error.details);
        res.status(422).send("Favor preecher os campos corretamente");
        return;
    }

    try {
        const participant = await db.collection("MyWalletUsers").find({ name }).toArray();

        if (participant.some(e => e.name === req.body.name)) {
            res.status(409).send("user ja existe!");
            return;
        }
    } catch (error) {
        res.status(500).send("erro ao procurar participante na database");
        return;
    }

    db.collection("MyWalletUsers").insertOne({
        name,
        email,
        password: cryptoPassword
    });

    res.sendStatus(201);
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.sendStatus(422);
    }

    const user = await db.collection("MyWalletUsers").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = uuid();

        await db.collection("sessions").insertOne({
            userId: user._id,
            token
        })

        res.status(201).send(token);
    } else {
        res.status(401).send("senha ou email incorretos");
    }
}