import Videogame from "../domain/Videogame";
import VideogamesRepository from "../domain/Videogame.repository";
import { isAuth } from "../../context/security/auth";

export default class VideogamesUseCases {
    videogamesRepository: VideogamesRepository;

    constructor(videogamesRepository: VideogamesRepository) {
        this.videogamesRepository = videogamesRepository;
    }

    async getAllGames(): Promise<Videogame[]> {
        const videogames: Videogame[] = await this.videogamesRepository.getAllGames();

        return videogames;
    }

    async getOneGame(id: Number): Promise<Videogame> {
        const videogame: Videogame = await this.videogamesRepository.getOneGame(id);
        return videogame;
    }

    async addGame(videogame: Videogame): Promise<Videogame> {
        const videogameReturned: Videogame = await this.videogamesRepository.addGame(videogame);
        return videogameReturned;
    }


    async modifyGame(videogame: Videogame, id: Number): Promise<Videogame> {
        const videogameReturned: Videogame = await this.videogamesRepository.modifyGame(videogame, id);
        return videogameReturned;
    }

    async deleteGame(id: Number): Promise<Videogame[]> {
        const videogames: Videogame[] = await this.videogamesRepository.deleteGame(id);
        return videogames;
    }


}