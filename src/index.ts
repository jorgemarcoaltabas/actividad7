//imports
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

//routers
import {routerUsers} from "./users/infrastructure/rest/users.router"
app.use("/users/",routerUsers);
//portListener
app.listen(process.env.PORT, () => {
    console.log(`Application started on port ${port}`);
  });
  