const mongoose = require('mongoose');

const TaiKhoanSchema = new mongoose.Schema({
    tenDangNhap: {
        type: String,
        required: true
    },
    email: String,
    matKhau: {
        type: String,
        required: true
    },
    name: String,
    age: Number,
})

const TaiKhoanModel = mongoose.model("TaiKhoan", TaiKhoanSchema);

module.exports = TaiKhoanModel;