
import Item from './Item';
export default interface CartRepository {
    getCart(idUser: Number): Promise<Item[]>,
    addToCart(idUser: Number, idGame: Number, quantity: Number): Promise<Item[]>,
    deleteFromCart(idUser: Number, idGame: Number): Promise<Item[]>,
    deleteCart(idUser: Number): Promise<Boolean>

}