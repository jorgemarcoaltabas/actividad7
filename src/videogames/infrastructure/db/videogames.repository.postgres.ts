import VideogamesRepository from "../../domain/Videogame.repository";

export default class VideogamesUseCases{
    videogamesRepository: VideogamesRepository;

    constructor(videogamesRepository: VideogamesRepository){
        this.videogamesRepository = videogamesRepository;
    }
}