const mongoose = require("mongoose");

const khachHangschema = mongoose.Schema({
  tenKhachHang: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  soDienThoai: {
    type: Number,
    required: true,
  },
  diachi: {
    type: String,
    required: true,
  },
});

const KhachHangModel = mongoose.model("ngonNgu", khachHangschema);

module.exports = KhachHangModel;
