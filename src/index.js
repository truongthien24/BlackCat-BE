const express = require("express");
// Kết nối mongodb
const mongoose = require("mongoose");
const cors = require("cors");
// Kết nối tới api
const apiRoute = require("./routes/api");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json())

app.use("/api/", apiRoute);

// Kết nối db
mongoose.connect(
  "mongodb+srv://blackcat:0122123123@atlascluster.kd36usa.mongodb.net/thuesach?retryWrites=true&w=majority"
);
const conn = mongoose.connection;
conn.once("open", () => {
  console.log("Successfull connection to db");
});
conn.on("error", () => {
  console.log("Fail to connection to db");
});

app.listen(3001, () => {
  console.log("Server is Running");
});
