import { Client } from "pg"

const connectDb = async () => {
    
    const ClientConnection = new Client({
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD
    })

    return ClientConnection
}


export default connectDb;