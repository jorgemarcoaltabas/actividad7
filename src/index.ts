//imports
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
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
//portListener


app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});
