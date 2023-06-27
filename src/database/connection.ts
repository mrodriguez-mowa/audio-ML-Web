import { Pool } from "pg"

const poolConnection = async () => {
    const pool = new Pool();  
    return pool;
}

export default poolConnection;