const mongoose = require("mongoose");

const NhaCungCapschema = mongoose.Schema({
  tenNhaCungCap: {
    type: String,
    required: true,
  },
  diaChiNhaCungCap: {
    type: String,
    required: true,
  },
  soDienThoai: {
    type: Number,
    required: true,
  },
});

const NhaCungCapModel = mongoose.model("nhaCungCap", NhaCungCapschema);

module.exports = NhaCungCapModel;
