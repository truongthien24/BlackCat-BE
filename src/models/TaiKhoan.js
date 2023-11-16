const mongoose = require("mongoose");

const TaiKhoanSchema = new mongoose.Schema({
  tenDangNhap: {
    type: String,
    required: true,
  },
  email: String,
  matKhau: {
    type: String,
    required: true,
  },
  hoTen: String,
  tuoi: Number,
  xacThucEmail: { type: Boolean },
  loaiTaiKhoan: { type: String, required: true },
  thongTinNhanHang: {
    tenKhachHang: { type: String },
    soDienThoai: { type: Number },
    diaChi: { type: String },
    type: Array,
  },
  gioHang: {
    type: String
  }
});

const TaiKhoanModel = mongoose.model("taiKhoan", TaiKhoanSchema);

module.exports = TaiKhoanModel;
