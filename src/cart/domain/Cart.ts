import User from "../../users/domain/User";
import Videogame from "../../videogames/domain/Videogame";
import ItemData from "./ItemData";

export default interface Cart {
    items: ItemData[]
    user?: Number,
}