import executeQuery from "../../../context/db/postgres.connector";
import Message from "../../../context/responses/Message";
import Videogame from "../../domain/Videogame";
import VideogamesRepository from "../../domain/Videogame.repository";


export default class VideogamesRepositoryPostgres implements VideogamesRepository {

    async getAllGames(): Promise<Videogame[]> {
        const videogamesDB: any[] = await executeQuery(`SELECT * FROM videogames`);

        const videogames: Videogame[] = [];

        for (const videogame of videogamesDB) {
            const myVideogame: Videogame = {
                id: videogame.id,
                name: videogame.name,
                price: videogame.price
            }
            videogames.push(myVideogame)
        }
        return videogames;
    }

    async getOneGame(id: Number): Promise<Videogame> {
        const videogameDB: any[] = await executeQuery("SELECT * FROM videogames where id =" + id);
        if (videogameDB.length > 0) {
            const videogame: Videogame = {
                id: videogameDB[0].id,
                name: videogameDB[0].name,
                price: videogameDB[0].price,
            }
            return videogame;
        }
        throw new Error("videogame not added");

    }
    async addGame(videogame: Videogame): Promise<Videogame> {
        console.log(videogame);
        const id: any[] = await executeQuery(`INSERT INTO videogames (name, price) VALUES ('${videogame.name}', ${videogame.price}) RETURNING id`);
        try {
            const videogameToReturn: Videogame = await this.getOneGame(id[0].id);

            return videogameToReturn;
        } catch (error) {
            console.error(error)
        }
        throw new Error("Videojuego no agregado");
    }
    async modifyGame(videogame: Videogame, id: Number): Promise<Videogame> {
        try {
            console.log(`UPDATE videogames SET name = '${videogame.name}', price = ${videogame.price} WHERE id = ${id} `)
            await executeQuery(`UPDATE videogames SET name = '${videogame.name}' , price = ${videogame.price} WHERE id = ${id} `)
            console.log(`videoJuegoModificado`)

            return {
                id: id,
                name: videogame.name,
                price: videogame.price
            }
        } catch (err) {
            console.error(err);
        }
        throw new Error("Videojuego no modificado");
    }
    async deleteGame(id: Number): Promise<Videogame[]> {
        try {
            await executeQuery(`DELETE FROM videogames WHERE id=${id}`)

            return this.getAllGames();
        } catch (err) {
            console.error(err);
        }
        throw new Error("Videojuego no eliminado");
    }

}