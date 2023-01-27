export default interface User {
    id?: number,
    name: string,
    password?: string,
    role?: "admin" | "user"
}