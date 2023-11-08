const mongoose = require('mongoose');
const Sach = require("../controller/sach.controller");

const GioHangschema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    danhSach: {
        type: Array<Sach> Sach,
        required: true,
    },
})

const GioHangModel = mongoose.model("gioHang", GioHangschema);

module.exports = GioHangModel;