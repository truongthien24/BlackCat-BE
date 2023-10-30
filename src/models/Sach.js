const mongoose = require('mongoose');

const SachSchema = mongoose.Schema({
    tenSach: {
        type: String,
        required: true,
    },
    nhaCungCap: {
        type: String,
        required: true,
    },
    noiDung: {
        type: String,
        required: true,
    },
    theLoai: {
        type: String,
        required: true
    },
    soLuong: {
        type: String,
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
        type: String,
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
        type: String,
        required: true,
    },
    tinhTrang: {
        type: String,
        required: true,
    },
})

const SachModel = mongoose.model("sach", SachSchema);

module.exports = SachModel;