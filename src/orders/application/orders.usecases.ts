import OrderRepository from './../domain/Orders.repository';
import VideogamesRepository from './../../videogames/domain/Videogame.repository';
import Order from '../domain/Order';
import OrderData from '../domain/OrderData';
import ItemData from '../domain/ItemData';
import Videogame from '../../videogames/domain/Videogame';
import User from './../../users/domain/User';
import Orders from '../domain/Orders';
import e from 'express';
import CartRepository from './../../cart/domain/Cart.repository';
export default class OrdersUsecases {

    orderRepository: OrderRepository
    videogamesRepository: VideogamesRepository
    cartRepository: CartRepository;
    constructor(orderRepository: OrderRepository, videogamesRepository: VideogamesRepository, cartRepository: CartRepository) {
        this.orderRepository = orderRepository;
        this.videogamesRepository = videogamesRepository;
        this.cartRepository = cartRepository;
    }

    async getOrders(idUser: Number): Promise<Orders | null> {
        try {
            const ordersDB: Order[] = await this.orderRepository.getOrders(idUser);
            const orders: Orders = {
                user: idUser
            }
            const ordersData: OrderData[] = [];

            for (let orderDB of ordersDB) {
                const itemsExtraData: ItemData[] = [];
                for (let item of orderDB.items) {
                    itemsExtraData.push({
                        videogame: await this.videogamesRepository.getOneGame(item.videogame),
                        price: item.price,
                        quantity: item.quantity
                    })

                }
                if (orderDB.id) {
                    const order: OrderData = {
                        id: orderDB.id,
                        items: itemsExtraData
                    }
                    ordersData.push(order);
                }

            }
            orders.orders = ordersData;
            return orders;
        } catch (err) {
            console.error(err)
        }
        return null;
    }

    async getOneOrder(idOrder: Number): Promise<OrderData | null> {
        try {

            const order: Order | null = await this.orderRepository.getOneOrder(idOrder);
            const itemsExtraData: ItemData[] = [];

            if (order) {
                for (let item of order.items) {
                    itemsExtraData.push({
                        videogame: await this.videogamesRepository.getOneGame(item.videogame),
                        price: item.price,
                        quantity: item.quantity,
                    })
                }
                if (order.id) {
                    const orderData: OrderData = {
                        id: order.id,
                        items: itemsExtraData
                    }
                    return orderData;
                }

            }

        } catch (err) {
            console.error(err)
        }
        return null;
    }

    async addOneOrder(order: Order, idUser: Number): Promise<Orders | null> {
        try {
            await this.orderRepository.addOneOrder(order, idUser);
            const orders: Orders = {
                orders: await
                    this.getOrders(idUser).then(orders => {
                        return orders?.orders
                    }),
                user: idUser
            }
            this.cartRepository.deleteCart(idUser);

            return orders;

        } catch (err) {
            console.error(err);
        }
        return null;
    }


}