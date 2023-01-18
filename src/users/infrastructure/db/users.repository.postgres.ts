import Message from "../../../context/responses/Message";
import User from "../../domain/User";

import UsersRepository from "../../domain/Users.repository";
import executeQuery from "../../../context/db/postgres.connector";
import { compare, hash } from "../../../context/security/encrypter";


export default class UsersRepositoryPostgres implements UsersRepository{
    async register(user: User): Promise<Message> {
        if(user.name && user.password){
            await executeQuery(``)

            const message: Message ={
                text: 'Usuario creado'
            }
            return message;
        }
        const message: Message ={
            text: 'Ha ocurrido un error'
        }
        return message;
    }
    async login(user: User): Promise<Boolean> {
        if (user.name && user.password){
            const result: any[] = await executeQuery(``)
            const userDB = result[0]
            if (userDB && compare(user.password, userDB.password)){
                return true;
            }
        }
        return false;
    }
}