const mongoose = require("mongoose");

const TheLoaischema = mongoose.Schema({
  tenTheLoai: {
    type: String,
    required: true,
  },
});

const TheLoaiModel = mongoose.model("theLoai", TheLoaischema);

module.exports = TheLoaiModel;
