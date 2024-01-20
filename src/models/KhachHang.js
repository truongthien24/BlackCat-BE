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
  sdt: {
    type: Number,
    required: true,
  },
  diaChi: {
    type: String,
    required: true,
  },
  danhSachDonHang: [
    {
      donHang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'donHang'
      },
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'taiKhoan'
  }
});

const KhachHangModel = mongoose.model("khachHang", khachHangschema);

module.exports = KhachHangModel;
