import express, { Request, Response } from 'express'
import VideogamesRepository from '../../../videogames/domain/Videogame.repository';
import VideogamesRepositoryPostgres from '../../../videogames/infrastructure/db/videogames.repository.postgres';
import CartRepository from '../../../cart/domain/Cart.repository';
import CartRepositoryPostgres from '../../../cart/infrastructure/db/cart.repository.postgres';
import OrderRepository from '../../domain/Orders.repository';
import OrderRepositoryPostgres from '../db/orders.repository.postgres';
import OrdersUsecases from './../../application/orders.usecases';
import { isAuth } from '../../../context/security/auth';
import Orders from '../../domain/Orders';
import Order from '../../domain/Order';
import OrderData from './../../domain/OrderData';

const orderRepository: OrderRepository = new OrderRepositoryPostgres();
const videogamesRepository: VideogamesRepository = new VideogamesRepositoryPostgres();
const cartRepository: CartRepository = new CartRepositoryPostgres();

const ordersUsecases: OrdersUsecases = new OrdersUsecases(orderRepository, videogamesRepository, cartRepository);

const router = express.Router();

router.get("/", isAuth, async (req: Request, res: Response) => {
    try {
        const orders: Orders | null = await ordersUsecases.getOrders(req.body.auth.id);
        res.json(orders)
    } catch (err) {
        console.error(err);
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const order: OrderData | null = await ordersUsecases.getOneOrder(Number(req.params.id))
        res.json(order);
    } catch (err) {
        console.error(err)
    }
})

router.post("/", isAuth, async (req: Request, res: Response) => {
    try {
        console.log(req.body.order)
        const orders: Orders | null = await ordersUsecases.addOneOrder(req.body.order, req.body.auth.id)
        res.json(orders);
    } catch (err) {
        console.error(err)
    }
})

export { router as routerOrders }