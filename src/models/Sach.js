const mongoose = require('mongoose');

const SachSchema = mongoose.Schema({
    tenSach: {
        type: String,
        required: true,
    },
    moTa: {
        type: String,
    },
    loaiSach: {
        type: String,
        required: true
    },
    soLuong: {
        type: Number,
        required: true
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
    namXuatBan: {
        type: Number,
        required: true,
    },
    tienCoc: {
        type: Number,
    },
    tinhTrang: {
        type: String
    },
})

const SachModel = mongoose.model("sach", SachSchema);

module.exports = SachModel;