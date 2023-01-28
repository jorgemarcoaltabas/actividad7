import express, { Request, Response } from "express";
const router = express.Router();

import UsersUseCases from "../../application/users.usecases";
import UsersRepository from "../../domain/Users.repository";
import UsersRepositoryPostgres from "../db/users.repository.postgres";

import User from "../../domain/User";
import Auth from "../../domain/Auth";
import Message from "../../../context/responses/Message";
import { isAdmin, isAuth } from "../../../context/security/auth";

const usersRepository: UsersRepository = new UsersRepositoryPostgres();
const usersUseCases: UsersUseCases = new UsersUseCases(usersRepository);

router.get("/", isAuth, async (req: Request, res: Response) => {
    try {

        const user: User = req.body.auth
        console.log(user);

        const userReturned: User | null = await usersUseCases.getUser(user);

        res.json(userReturned)

    } catch (err) {
        console.error(err);
    }
})

router.get("/all", isAuth, isAdmin, async (req: Request, res: Response) => {
    try {

        const usersReturned: User[] | null = await usersUseCases.getAllUsers();

        res.json(usersReturned)

    } catch (err) {
        console.error(err);
    }
})

router.post("/register", async (req: Request, res: Response) => {
    console.log("hola te estas intentando registrar");
    try {
        const user: User = {
            name: req.body.name,
            password: req.body.password
        }
        console.log(user);
        const result: Auth | Message = await usersUseCases.register(user)
        console.log(result);
        res.json(result);
    } catch (error) {
        const message: Message = {
            text: String(error),
        }
        res.status(500).send(message)
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const user: User = {
            name: req.body.name,
            password: req.body.password
        };
        const login = await usersUseCases.login(user);
        if (login) {
            user.id = login.id;
            user.role = login.role;
            const auth: Auth = usersUseCases.createToken(user)
            res.json(auth)
        } else {
            const message: Message = {
                text: 'Autentificacion incorrecta'
            }
            res.status(404).send(message)
        }
    } catch (error) {
        const message: Message = {
            text: String(error)
        };
        res.status(500).send(message)
    }
})


export { router as routerUsers }