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
  ngayTao: {
    type: String,
  },
  hinhAnh: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
});

const BaiVietModel = mongoose.model("baiViet", BaiVietSchema);

module.exports = BaiVietModel;
