// const express = require("express");
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js"
import itemsRoutes from "./routes/items.route.js"
import items2Routes from "./routes/items2.route.js"
import loginRoutes from "./routes/login.routes.js"
import morgan from 'morgan';
import { connectDB } from "./utilities/mongodb.js";

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(indexRoutes);
app.use(itemsRoutes);
app.use(items2Routes);
app.use(loginRoutes);


app.listen(3000, console.log("http://localhost:3000"));
