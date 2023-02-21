//imports
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { NextFunction } from "express";

dotenv.config();

const app = express();

app.use(express.json());

//routers
import { routerUsers } from "./users/infrastructure/rest/users.router"
import { routerVideogames } from "./videogames/infrastructure/rest/videogames.router"
import { routerOrders } from "./orders/infrastructure/rest/orders.router";
import { routerCart } from "./cart/infrastructure/rest/cart.router";
app.use("/users", routerUsers);
app.use("/videogames", routerVideogames)
app.use("/carts", routerCart)
app.use("/orders", routerOrders)
app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "Allo! Catch-all route." });
});
//portListener

export { app }
