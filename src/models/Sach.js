const mongoose = require("mongoose");

const SachSchema = mongoose.Schema({
  tenSach: {
    type: String,
    required: true,
  },
  nhaCungCap: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'nhaCungCap'
  },
  noiDung: {
    type: String,
    required: true,
  },
  theLoai: {
    type: String,
    required: true,
  },
  soLuong: {
    type: Number,
    required: true,
  },
  maSach: {
    type: String,
    required: true,
  },
  tacGia: {
    type: String,
    required: true,
  },
  gia: {
    type: Number,
    required: true,
  },
  nhaXuatBan: {
    type: String,
    required: true,
  },
  namXuatBan: {
    type: String,
    required: true,
  },
  tienCoc: {
    type: Number,
    required: true,
  },
  tinhTrang: {
    type: String,
    required: true,
  },
  hinhAnh: {
    type: String,
    required: true,
  },
});

const SachModel = mongoose.model("sach", SachSchema);

module.exports = SachModel;
