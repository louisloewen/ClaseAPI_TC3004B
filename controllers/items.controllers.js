import { sqlConnect, sql } from "../utilities/sql.js";

export const getItems = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().query("select * from items");
    // console.log(data.recordset);
    res.json(data.recordset);
};

export const getItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request().input("myId", sql.Int, req.params.id).query("select * from items where id = @myId");
    // console.log(data.recordset);
    res.json(data.recordset);
};

export const postItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.request()
    .input("name", sql.VarChar, req.body.name)
    .input("price", sql.Float, req.body.price)
    .query("insert into items(name, price) values (@name, @price)");
    // console.log(data.recordset);
    res.status(200).json({ operation: true });
};

export const putItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("Id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Float, req.body.price)
        .query("update items set (name=@name, price=@price) where id=@id");
    // console.log(data.recordset);
    res.status(200).json({ operation: true })
};

export const deleteItem = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("Id", sql.Int, req.params.id)
        .query("delete from items where id=@id");
    // console.log(data.recordset);
    res.status(200).json({ operation: true })
};