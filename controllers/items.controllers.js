import { sqlConnect, sql } from "../utilities/sql.js";

export const getItems = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().query("select * from items");
    console.log(data);
};