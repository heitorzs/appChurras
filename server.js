const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config()

const cors = require("cors");
const app = express();

const routes = require("./routes/routes.js");

const PORT = process.env.PORT | 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch((err)=>console.log(err))

app.use(express.json());
app.use(cors());
// app.use("/", routes)

app.listen(PORT, ()=> console.log(`Listening at ${PORT}`));

