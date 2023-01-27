
import Videogame from '../../videogames/domain/Videogame';
export default interface ItemData {
    videogame: Videogame,
    quantity: Number,
    price: Number,
}