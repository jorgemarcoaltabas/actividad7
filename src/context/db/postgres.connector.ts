import { Pool } from 'pg';
import dotenv from "dotenv"
dotenv.config()

const dbHost = process.env.POSTGRES_HOST
const dbUser = process.env.POSTGRES_USER
const dbPassword = process.env.POSTGRES_PASSWORD
const dbName = process.env.POSTGRES_NAME

const pool = new Pool({
    max: 20,
    connectionString: `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`,
    idleTimeoutMillis: 30000
});


const executeQuery = async (sql: any) => {
    const client = await pool.connect()
    const {rows} = await client.query(sql)
    client.release()
    return rows
}

export default executeQuery;