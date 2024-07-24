import database from "mariadb";
import env from "dotenv";
env.config();

const {HOST ,PORT ,USER ,PASSWORD ,DATABASE}=process.env;
export const connection = await database.createConnection({
    host:HOST,
    port:PORT,
    user:USER,
    password:PASSWORD,
    database:DATABASE,
})

