import User from "../../users/domain/User";
import Item from "./Item";


export default interface Order {
    items: Item[],
    id?: Number
}