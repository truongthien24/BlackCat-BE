const express = require('express');
// Kết nối mongodb
const mongoose = require('mongoose');
const cors = require('cors');
// Kết nối tới api
const apiRoute = require("./routes/api");
const app = express();

app.use(cors())
app.use(express.json())

app.use("/", apiRoute);

// mongoose.connect("mongodb://127.0.0.1:27017/crud");
// mongoose.connect("mongodb+srv://truongthien2411:thiendeptrai24@cluster0.a3wrie5.mongodb.net/?retryWrites=true&w=majority");
// Kết nối db
mongoose.connect("mongodb+srv://blackcat:0122123123@atlascluster.kd36usa.mongodb.net/thuesach?retryWrites=true&w=majority");
const conn = mongoose.connection;
conn.once('open', () => {
    console.log('Successfull connection to db')
});
conn.on('error', () => {
    console.log('Fail to connection to db')
})

app.listen(3001, () => {
    console.log("Server is Running");
})