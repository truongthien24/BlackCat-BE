const mongoose = require('mongoose');

const GioHangschema = mongoose.Schema({
    userId: {
        type: String,
    },
    danhSach: [{
        sach: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sach'
        },
        soLuong: {
            type: Number,
            default: 1
        }
    }],
    tongGia: {
        type: Number,
        default: 0
    }
})

const GioHangModel = mongoose.model("gioHang", GioHangschema);

module.exports = GioHangModel;