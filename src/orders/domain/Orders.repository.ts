import Order from "./Order";

export default interface OrderRepository {
    getOrders(idUser: Number): Promise<Order[]>;
    getOneOrder(idOrder: Number): Promise<Order | null>;
    addOneOrder(order: Order, idUser: Number): Promise<Order[] | null>
}