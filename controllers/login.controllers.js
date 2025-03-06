import { sqlConnect, sql } from "../utilities/sql.js";

export const login = async(req, res) => {
    const pool = await sqlConnect();
    const data = await pool.
    request()
    .input("username", sql.VarChar, req.body.username)
    .query(" select * from users where username=@username");
    // console.log(data.recordset);
    let isLogin = data.recordset.password === req.body.password;
    res.status(200).json({ isLogin: isLogin });
};