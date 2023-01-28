import Message from "../../../context/responses/Message";
import User from "../../domain/User";

import UsersRepository from "../../domain/Users.repository";
import executeQuery from "../../../context/db/postgres.connector";
import { compare, hash } from "../../../context/security/encrypter";


export default class UsersRepositoryPostgres implements UsersRepository {
    async getUser(idUser: Number): Promise<User> {
        const userDB: any[] = await executeQuery("SELECT id, name, role FROM users WHERE id=" + idUser)

        const user: User = {
            id: userDB[0].id,
            name: userDB[0].name,
            role: userDB[0].role
        }

        return user;
    }
    async getAllUsers(): Promise<User[]> {
        const usersDB: any[] = await executeQuery("SELECT id, name, role FROM users")
        const users: User[] = [];

        usersDB.forEach(userDB => {
            users.push({
                id: userDB.id,
                name: userDB.name,
                role: userDB.role
            })


        })
        return users;

    }
    async register(user: User): Promise<Message> {
        if (user.name && user.password) {
            try {
                const any = await executeQuery(`insert into users (name, password) values ('${user.name}','${hash(user.password)}')`)

                const message: Message = {
                    text: 'Usuario creado'
                }
                return message;
            } catch (err) {
                console.error(err);
            }

        }
        const message: Message = {
            text: 'Ha ocurrido un error'
        }
        return message;
    }
    async login(user: User): Promise<User> {
        if (user.name && user.password) {
            const result: any[] = await executeQuery(`select * from users where name = '${user.name}'`)
            const userDB = result[0]
            if (userDB && compare(user.password, userDB.password)) {
                const user1: User = {
                    id: userDB.id,
                    name: userDB.name,
                    role: userDB.role,
                }
                return user1;
            }
        }
        return {
            name: "no existe"
        }
    }
}