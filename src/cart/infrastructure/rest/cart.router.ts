import CartRepository from "../../domain/Cart.repository";
import CartRepositoryPostgres from "../db/cart.repository.postgres";
import Cartusecases from "../../application/cart.usecases";
import Cart from "../../domain/Cart";
import express, { Request, Response } from 'express'
import { isAuth } from "../../../context/security/auth";
import UsersRepository from './../../../users/domain/Users.repository';
import UsersRepositoryPostgres from './../../../users/infrastructure/db/users.repository.postgres';
import VideogamesRepository from './../../../videogames/domain/Videogame.repository';
import VideogamesRepositoryPostgres from './../../../videogames/infrastructure/db/videogames.repository.postgres';
import VideogameRepository from "./../../../videogames/domain/Videogame.repository";
import Videogame from "../../../videogames/domain/Videogame";

const router = express.Router();

const cartRepository: CartRepository = new CartRepositoryPostgres();
const videogamesRepository: VideogameRepository = new VideogamesRepositoryPostgres();
const cartusecases: Cartusecases = new Cartusecases(cartRepository, videogamesRepository);

router.get("/", isAuth, async (req: Request, res: Response) => {

    try {

        const idUser: Number = req.body.auth.id

        const cart: Cart = await cartusecases.getCart(idUser);

        res.json(cart);

    } catch (err) {
        console.error(err);
    }
})

router.post("/:idGame", isAuth, async (req: Request, res: Response) => {
    try {

        const idUser: Number = req.body.auth.id;
        const idGame: Number = Number(req.params.idGame);
        const quantity: Number = Number(req.query.quantity);

        const cart: Cart = await cartusecases.addToCart(idUser, idGame, quantity);

        res.json(cart);

    } catch (err) {
        console.error(err);
    }
})

router.put("/:idGame", isAuth, async (req: Request, res: Response) => {
    try {
        const idUser: Number = req.body.auth.id;
        const idGame: Number = Number(req.params.idGame);

        const cart: Cart = await cartusecases.deleteFromCart(idUser, idGame);

        res.json(cart);
    } catch (err) {
        console.error(err);
    }
})

router.delete("/", isAuth, async (req: Request, res: Response) => {

    try {
        const idUser: Number = req.body.auth.id;

        await cartusecases.deleteCart(idUser);

        res.send("correct");
    } catch (err) {
        console.error(err);
    }
})

