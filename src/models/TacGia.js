const mongoose = require("mongoose");

const TacGiaSchema = mongoose.Schema({
  tenTacGia: {
    type: String,
    required: true,
  },
  chiTietTacGia: {
    type: String,
  },
});

const TacGiaModel = mongoose.model("tacGia", TacGiaSchema);

module.exports = TacGiaModel;
