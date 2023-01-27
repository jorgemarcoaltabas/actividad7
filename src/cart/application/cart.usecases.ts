
import Videogame from '../../videogames/domain/Videogame';
import CartRepository from './../domain/Cart.repository';
import VideogamesRepository from './../../videogames/domain/Videogame.repository';
import Cart from '../domain/Cart';

export default class Cartusecases {
    cartRepository: CartRepository
    videogameRepository: VideogamesRepository

    constructor(cartRepository: CartRepository, videogameRepository: VideogamesRepository) {
        this.cartRepository = cartRepository;
        this.videogameRepository = videogameRepository;
    }

    async getCart(id: Number): Promise<Cart> {
        const items: Map<Videogame, Number> = new Map<Videogame, Number>();
        try {
            const cartDB: Map<Number, Number> = await this.cartRepository.getCart(id);
            for (let [videogame, quantity] of cartDB) {
                const videogameData: Videogame = await this.videogameRepository.getOneGame(videogame);
                items.set(videogameData, quantity);
            }
        } catch (err) {
            console.error(err)
        }
        const cart: Cart = {
            items: items,
        }
        return cart;
    }
    async addToCart(idUser: Number, idGame: Number, quantity: Number): Promise<Cart> {
        try {
            await this.cartRepository.addToCart(idUser, idGame, quantity);

        } catch (err) {
            console.error(err);
        }
        return this.getCart(idUser)
    }


    async deleteFromCart(idUser: Number, idGame: Number): Promise<Cart> {

        try {
            await this.cartRepository.deleteFromCart(idUser, idGame);
        } catch (err) {
            console.error(err);
        }
        return this.getCart(idUser);
    }

    async deleteCart(idUser: Number) {
        try {
            await this.cartRepository.deleteCart(idUser);
        } catch (err) {
            console.error(err);
        }
    }
}