import User from "../../users/domain/User";
import Videogame from "../../videogames/domain/Videogame";

export default interface Cart {
    items: Map<Videogame, Number>,
    user?: User,
}