export default interface CartRepository {
    getCart(idUser: Number): Promise<Map<Number, Number>>,
    addToCart(idUser: Number, idGame: Number, quantity: Number): Promise<Map<Number, Number>>,
    deleteFromCart(idUser: Number, idGame: Number): Promise<Map<Number, Number>>,
    deleteCart(idUser: Number): Promise<Boolean>

}