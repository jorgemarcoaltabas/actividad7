import Message from "../../context/responses/Message";
import Videogame from "./Videogame";

export default interface VideogamesRepository{
    gameList(videogame: Videogame): Promise<Videogame[]>
    oneGame(videogame: Videogame): Promise<Videogame>
    putGame(videogame: Videogame): Promise<Message>
}