import OrderRepository from './../domain/Orders.repository';
import VideogamesRepository from './../../videogames/domain/Videogame.repository';
import Order from '../domain/Order';
import OrderData from '../domain/OrderData';
import ItemData from '../domain/ItemData';
import Videogame from '../../videogames/domain/Videogame';
import User from './../../users/domain/User';
import Orders from '../domain/Orders';
import e from 'express';
export default class ordersUsecases {

    orderRepository: OrderRepository
    videogamesRepository: VideogamesRepository
    constructor(orderRepository: OrderRepository, videogamesRepository: VideogamesRepository) {
        this.orderRepository = orderRepository;
        this.videogamesRepository = videogamesRepository;
    }

    async getOrders(idUser: Number): Promise<Orders | null> {
        try {
            const ordersDB: Order[] = await this.orderRepository.getOrders(idUser);
            const orders: Orders = {
                user: idUser
            }

            for (let orderDB of ordersDB) {
                const itemsExtraData: ItemData[] = [];
                for (let item of orderDB.items) {
                    itemsExtraData.push({
                        videogame: await this.videogamesRepository.getOneGame(item.videogame),
                        price: item.price,
                        quantity: item.quantity
                    })

                }
                const order: OrderData = {
                    id: orderDB.id,
                    items: itemsExtraData
                }
                orders.orders?.push(order);

            }
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
                const orderData: OrderData = {
                    id: order.id,
                    items: itemsExtraData
                }
                return orderData;
            }

        } catch (err) {
            console.error(err)
        }
        return null;
    }

    async addOneOrder(order: Order, idUser: Number): Promise<Orders | null> {
        try {
            await this.orderRepository.addOneOrder(order, idUser);
            this.getOrders(idUser).then(data => { if (data) { const orders: Orders = data; return orders } });


        } catch (err) {
            console.error(err);
        }
        return null;
    }
}