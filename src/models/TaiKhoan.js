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
    hoTen: String,
    tuoi: Number,
    xacThucEmail: { type: Boolean }
})

const TaiKhoanModel = mongoose.model("taiKhoan", TaiKhoanSchema);

module.exports = TaiKhoanModel;