import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv/config.js"
import cors from "cors"
import routes from "./routes/routes.js";

const app = express();
app.use(express.json())

const PORT = process.env.PORT | 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch((err)=>console.log(err))



app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(PORT, ()=> console.log(`Listening at ${PORT}`));

