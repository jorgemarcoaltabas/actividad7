
import CartRepository from './../../domain/Cart.repository';
import executeQuery from './../../../context/db/postgres.connector';
import Videogame from './../../../videogames/domain/Videogame';
export default class CartRepositoryPostgres implements CartRepository {
    async getCart(idUser: Number): Promise<Map<Number, Number>> {
        const cart: Map<Number, Number> = new Map<Number, Number>();
        try {
            const cartDB: any[] = await executeQuery("SELECT videogame , quantity FROM carts where user =" + idUser);

            for (let item of cartDB) {
                cart.set(item.videogame, item.quantity)
            }

        } catch (err) {
            console.error(err);
        }
        return cart;

    }
    async addToCart(idUser: Number, idGame: Number, quantity: Number): Promise<Map<Number, Number>> {
        let cart: Map<Number, Number> = new Map<Number, Number>();
        try {
            await executeQuery(`INSERT INTO carts VALUES (${idUser}, ${idGame}, ${quantity})`)

            cart = await this.getCart(idUser);
        } catch (err) {
            console.error(err);
        }
        return cart;

    }
    async deleteFromCart(idUser: Number, idGame: Number): Promise<Map<Number, Number>> {
        let cart: Map<Number, Number> = new Map<Number, Number>();
        try {
            await executeQuery(`DELETE FROM carts WHERE user=${idUser} AND videogame=${idGame} `);
            cart = await this.getCart(idUser);
        } catch (err) {
            console.error(err)
        }
        return cart;

    }
    async deleteCart(idUser: Number): Promise<Boolean> {
        try {
            await executeQuery(`DELETE FROM carts WHERE user = ${idUser} `)
        } catch (err) {
            console.error(err)
            return false;
        }
        return true;
    }

}