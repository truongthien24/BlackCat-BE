const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoute = require("./routes/api");

const app = express();
app.use(cors())
app.use(express.json())

app.use("/", apiRoute);

mongoose.connect("mongodb://127.0.0.1:27017/crud");

app.listen(3001, ()=> {
    console.log("Server is Running");
})