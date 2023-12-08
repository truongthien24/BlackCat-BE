const { default: mongoose } = require("mongoose");
const DonHang = require("../models/DonHang");
const GioHang = require("../models/GioHang");
const sendEmailPaymentSuccess = require("../utils/sendEmailPaymentSuccess");

const getAllDonHang = async (req, res) => {
  try {
    const { userId } = req.body;
    let DonHangs = [];
    if (mongoose.Types.ObjectId.isValid(userId)) {
      DonHangs = await DonHang.find({ userId: userId }).populate(
        "danhSach.sach"
      );
    } else {
      DonHangs = await DonHang.find({}).populate("danhSach.sach");
    }
    res.status(200).json({ data: DonHangs });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createDonHang = async (req, res) => {
  const {
    userId,
    danhSach,
    thongTinGiaoHang,
    thongTinThanhToan,
    tongGia,
    email,
    gioHangId,
  } = req.body;
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let maDon = "";

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      maDon += characters.charAt(randomIndex);
    }
    const donHang = await DonHang.create({
      userId,
      danhSach,
      ngayTaoDon: new Date(),
      thongTinGiaoHang,
      thongTinThanhToan,
      tongGia,
      maDonHang: maDon,
      loTrinhDonHang: [],
      tinhTrang: 0,
    });

    if (donHang) {
      await sendEmailPaymentSuccess(email, "Verify Email", donHang);
      for (let sach = 0; sach < danhSach?.length; sach++) {}
      await GioHang.findOneAndUpdate(
        { _id: gioHangId },
        { danhSach: [], tongGia: 0 }
      );
      res.status(200).json({ message: "Hoàn tất", data: donHang });
    } else {
      return res
        .status(400)
        .json({ error: { message: "Tạo đơn hàng không thành công" } });
    }
  } catch (error) {
    return res.status(400).json({ error: { message: "Lỗi server" } });
  }
};

const updateDonHang = async (req, res) => {
  const { id } = req.params;
  const donHang = await DonHang.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!donHang) {
    return res
      .status(400)
      .json({ error: { message: "Bài Viết không tồn tại" } });
  }

  res.status(200).json({ data: [], message: "Cập nhật thành công" });
};

const deleteDonHang = async (req, res) => {
  const { id } = req.params;

  const donHang = await DonHang.findOneAndDelete({ _id: id });

  if (!donHang) {
    return res.status(400).json({ error: "Bài viết không tồn tại" });
  }

  res.status(200).json({ data: donHang, message: "Xoá thành công" });
};

const getDonHangByID = async (req, res) => {
  const { id } = req.params;
  try {
    const donHang = await DonHang.findOne({ _id: id });
    res.status(200).json({ data: donHang, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = {
  getAllDonHang,
  createDonHang,
  updateDonHang,
  deleteDonHang,
  getDonHangByID,
};
