import mysql from "mysql2";

const db = await mysql.createConnection({
    host:"localhost",
    port: 3307,
    user:"root",
    database:"todo_db"
});

export default db;