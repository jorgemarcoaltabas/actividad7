import Videogame from "../domain/Videogame";
import VideogamesRepository from "../domain/Videogame.repository";

export default class VideogamesUseCases{
    videogamesRepository: VideogamesRepository;

    constructor(videogamesRepository: VideogamesRepository){
        this.videogamesRepository = videogamesRepository;
    }

    async getAllGames() : Promise<Videogame[]>{
        const videogames : Videogame[] = await this.videogamesRepository.getAllGames();

        return videogames;
    }

    async getOneGame (id : Number): Promise<Videogame>{
        const videogame : Videogame = await this.videogamesRepository.getOneGame(id);
        return videogame;
    }

    async addGame( videogame : Videogame) : Promise<Videogame>{
        
        return this.videogamesRepository.addGame(videogame);
    }

    
}