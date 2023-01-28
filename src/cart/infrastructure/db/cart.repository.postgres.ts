
import CartRepository from './../../domain/Cart.repository';
import executeQuery from './../../../context/db/postgres.connector';
import Videogame from './../../../videogames/domain/Videogame';
import Item from '../../domain/Item';
export default class CartRepositoryPostgres implements CartRepository {

    async getCart(idUser: Number): Promise<Item[]> {
        const items: Item[] = [];
        try {
            const cartDB: any[] = await executeQuery("SELECT videogames , quantity FROM carts where users =" + idUser);

            for (let item of cartDB) {
                items.push(
                    {
                        videogame: item.videogames,
                        quantity: item.quantity,
                    }
                )
            }
            return items;

        } catch (err) {
            console.error(err);
        }
        console.log("GET CART:")
        console.log(items);
        return items;

    }
    async addToCart(idUser: Number, idGame: Number, quantity: Number): Promise<Item[]> {
        let items: Item[] = [];
        try {
            await executeQuery(`INSERT INTO carts VALUES (${idUser}, ${idGame}, ${quantity})`)

            items = await this.getCart(idUser);
        } catch (err) {
            console.error(err);
        }
        return items;

    }
    async deleteFromCart(idUser: Number, idGame: Number): Promise<Item[]> {
        let items: Item[] = [];
        try {
            await executeQuery(`DELETE FROM carts WHERE users = ${idUser} AND videogames = ${idGame} `);
            items = await this.getCart(idUser);
        } catch (err) {
            console.error(err)
        }
        return items;

    }
    async deleteCart(idUser: Number): Promise<Boolean> {
        try {
            await executeQuery(`DELETE FROM carts WHERE users = ${idUser} `)
        } catch (err) {
            console.error(err)
            return false;
        }
        return true;
    }

}