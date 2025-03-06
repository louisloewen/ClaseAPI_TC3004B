// const express = require("express");
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import indexRoutes from "./routes/index.routes.js"
import itemsRoutes from "./routes/items.route.js"
import loginRoutes from "./routes/login.routes.js"

const app = express();

app.use(express.json());
app.use(indexRoutes);
app.use(itemsRoutes);
app.use(loginRoutes);

app.listen(3000, console.log("http://localhost:3000"));
