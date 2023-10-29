const mongoose = require('mongoose');

const NhaCungCapschema = mongoose.Schema({
    tenNhaCungCap: {
        type: String,
        required: true,
    },
})

const NhaCungCapModel = mongoose.model("nhaCungCap", NhaCungCapschema);

module.exports = NhaCungCapModel;