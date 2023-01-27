import Message from "../../context/responses/Message";
import Videogame from "./Videogame";

export default interface VideogamesRepository{
    getAllGames(): Promise<Videogame[]>
    getOneGame(id : Number): Promise<Videogame>
    addGame(videogame: Videogame): Promise<Videogame>
    modifyGame(videogame : Videogame , id : Number) : Promise<Videogame> 
    deleteGame(id: Number) : Promise<Videogame[]>
}