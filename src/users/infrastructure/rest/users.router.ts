import express, { Request, Response } from "express";
const router = express.Router();

import UsersUseCases from "../../application/users.usercases";
import UsersRepository from "../../domain/Users.repository";
import UsersRepositoryPostgres from "../db/users.repository.postgres";

import User from "../../domain/User";
import Auth from "../../domain/Auth";
import Message from "../../../context/responses/Message";

const usersRepository: UsersRepository = new UsersRepositoryPostgres();
const usersUseCases: UsersUseCases = new UsersUseCases(usersRepository);

router.post("/register", async (req: Request, res: Response) =>{
    try{
        const user: User = {
            name: req.body.name,
            password: req.body.password 
        }
        const result: Auth | Message = await usersUseCases.register(user)
        res.json(result);
    }catch (error){
        const message: Message = {
            text: String(error),
        }
        res.status(500).send(message)
    }
});

router.post("/login", async (req:Request,res:Response) =>{
    try{
        const user: User = {
            name: req.body.name,
            password: req.body.password
        };
        const login = await usersUseCases.login(user);
        if(login){
            const auth: Auth = usersUseCases.createToken(user)
            res.json(auth)
        }else{
            const message: Message = {
                text: 'Autentificacion incorrecta'
            }
            res.status(404).send(message)
        }
    }   catch (error){
        const message: Message = {
            text: String(error)
        };
        res.status(500).send(message)
    }
})
export{ router as routerUsers}