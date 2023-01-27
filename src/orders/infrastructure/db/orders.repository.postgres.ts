
import Order from '../../domain/Order';
import OrderRepository from './../../domain/Orders.repository';
import executeQuery from './../../../context/db/postgres.connector';
import Item from '../../domain/Item';
import Videogame from './../../../videogames/domain/Videogame';
export default class OrderRepositoryPostgres implements OrderRepository {
    async getOrders(idUser: Number): Promise<Order[]> {
        const orders: Order[] = [];
        try {
            const ordersDB: any[] = await executeQuery(`SELECT * FROM orders WHERE  user = ${idUser}`)

            for (let item of ordersDB) {

                const itemsDB: any[] = await executeQuery(`SELECT * FROM order_videogames WHERE orders=${item.id}`)
                const items: Item[] = [];
                for (let item of itemsDB) {
                    items.push({
                        videogame: item.videogame,
                        quantity: item.quantity,
                        price: item.price,
                    })
                }
                const order: Order = {
                    id: item.id,
                    items: items
                }
                orders.push(order);

            }
        } catch (err) {
            console.error(err)
        }
        return orders;
    }
    async getOneOrder(idOrder: Number): Promise<Order | null> {

        try {
            const itemsDB: any[] = await executeQuery(`SELECT * FROM order_videogames WHERE order=${idOrder}`)
            const items: Item[] = []
            for (let item of itemsDB) {
                items.push({
                    videogame: item.videogame,
                    price: item.price,
                    quantity: item.quantity,
                });
            }
            const order = {
                id: idOrder,
                items: items
            }

            return order
        } catch (err) {
            console.error(err)
        }
        return null;

    }
    async addOneOrder(order: Order, idUser: Number): Promise<Order[] | null> {

        try {
            const idOrder = await executeQuery(`INSERT INTO orders  (users) VALUES (${idUser}) RETURNING id`)[0].id
            order.id = idOrder;
            await
                order.items.forEach(async item => await executeQuery(`INSERT INTO order_videogames VALUES (${order.id}, ${item.videogame}, ${item.price}, ${item.quantity})`))

            return this.getOrders(idUser);

        } catch (err) {
            console.error(err)
        }
        return null;
    }

}