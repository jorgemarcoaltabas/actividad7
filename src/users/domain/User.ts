export default interface User {
    id?: Number,
    name: string,
    password?: string,
    role?: "admin" | "user"
}