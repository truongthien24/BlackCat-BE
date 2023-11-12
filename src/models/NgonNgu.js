const mongoose = require("mongoose");

const ngonNguschema = mongoose.Schema({
  tenNgonNgu: {
    type: String,
    required: true,
  },
});

const NgonNguModel = mongoose.model("ngonNgu", ngonNguschema);

module.exports = NgonNguModel;
