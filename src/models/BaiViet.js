const mongoose = require("mongoose");

const BaiVietSchema = mongoose.Schema({
  tenBaiViet: {
    type: String,
    required: true,
  },
  noiDung: {
    type: String,
    required: true,
  },
  hinhAnh: {
    type: String,
  },
});

const BaiVietModel = mongoose.model("baiViet", BaiVietSchema);

module.exports = BaiVietModel;
