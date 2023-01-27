import OrderData from "./OrderData";


export default interface Orders {
    user: Number,
    orders?: OrderData[]
}