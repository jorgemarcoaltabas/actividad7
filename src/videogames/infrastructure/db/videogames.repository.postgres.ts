import executeQuery from "../../../context/db/postgres.connector";
import Message from "../../../context/responses/Message";
import Videogame from "../../domain/Videogame";
import VideogamesRepository from "../../domain/Videogame.repository";


export default class VideogamesRepositoryPostgres implements VideogamesRepository{
    async gameList(): Promise<Videogame[]> {
        const videogamesDB : any[] = await executeQuery(`SELECT * FROM VIDEOGAMES`);

        const videogames = [];

        for (const videogame of videogamesDB){
            const myVideogame : Videogame = {
                id : videogame.id,
                name : videogame.name,
                price : videogame.price 
            }
           // videogames.push(myVideogame)
        }


    }
    async oneGame(videogame: Videogame): Promise<Videogame> {
        throw new Error("Method not implemented.");
    }
    async putGame(videogame: Videogame): Promise<Message> {
        throw new Error("Method not implemented.");
    }
    
}