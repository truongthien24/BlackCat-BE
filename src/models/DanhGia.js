const mongoose = require("mongoose");

const DanhGiaSchema = mongoose.Schema({
    idTaiKhoan:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "taiKhoan",
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

const BaiVietModel = mongoose.model("danhGia", DanhGiaSchema);

module.exports = BaiVietModel;
