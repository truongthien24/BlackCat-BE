const mongoose = require("mongoose");

const NhaXuatBanschema = mongoose.Schema({
  tenNXB: {
    type: String,
    required: true,
  },
  quocGia: {
    type: String,
    required: true,
  },
});

const NhaXuatBanModel = mongoose.model("nhaXuatBan", NhaXuatBanschema);

module.exports = NhaXuatBanModel;
