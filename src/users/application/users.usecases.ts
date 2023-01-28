import Message from "../../context/responses/Message";
import { createToken } from "../../context/security/auth";
import Auth from "../domain/Auth";
import User from "../domain/User";
import UsersRepository from "../domain/Users.repository";

export default class UsersUseCases {
  usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async getUser(user: User): Promise<User | null> {
    if (user.id) {
      const userReturned: User = await this.usersRepository.getUser(user.id)
      return userReturned;
    }
    return null;

  }

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.getAllUsers();
  }

  register(user: User): Promise<Message> {
    return this.usersRepository.register(user);
  }

  login(user: User): Promise<User> {
    return this.usersRepository.login(user);
  }

  createToken(user: User): Auth {
    const auth: Auth = {
      user: {
        name: user.name,
      },
      token: createToken(user),
    };
    return auth;
  }
}
