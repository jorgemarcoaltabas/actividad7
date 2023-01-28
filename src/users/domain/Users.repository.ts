import Message from "../../context/responses/Message";
import User from "./User";

export default interface UsersRepository {
    register(user: User): Promise<Message>;
    login(user: User): Promise<User>;
    getUser(idUser: Number): Promise<User>
    getAllUsers(): Promise<User[]>
}