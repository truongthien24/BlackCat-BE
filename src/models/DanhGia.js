const mongoose = require("mongoose");

const DanhGiaSchema = mongoose.Schema({
    idTaiKhoan:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taiKhoan",
    },
    idSach:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sach",
    },
    idDanhGiaFather: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "danhGia",
    },
    noiDung: {
        type: String,
        required: true,
    },
    soSao: {
        type: Number,
    },
    ngayTao: {
        type: String,
        required: true,
    },
    hinhAnh: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    admin: {
        type: Boolean,
        required: false,
    }
});

const DanhGiaModel = mongoose.model("danhGia", DanhGiaSchema);

module.exports = DanhGiaModel;
