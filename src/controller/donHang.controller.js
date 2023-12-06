const DonHang = require("../models/DonHang");
const GioHang = require("../models/GioHang");
const sendEmailPaymentSuccess = require("../utils/sendEmailPaymentSuccess");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

const getAllDonHang = async (req, res) => {
  try {
    const { userId } = req.body;
    const DonHangs = await DonHang.find({ userId: userId });
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
      await GioHang.findOneAndUpdate({_id: gioHangId}, {danhSach: [], tongGia: 0})
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
  const { hinhAnh } = req.body;
  const { tenDonHang } = req.body;
  let data = tenDonHang.trim();
  let data1 = data.replace(/\s+/g, " ");
  let image = {};
  if (hinhAnh?.public_id) {
    image = hinhAnh;
  } else {
    image = await uploadToCloudinary(req.body.hinhAnh.url, "DonHangs");
  }
  const DonHang = await DonHang.findOneAndUpdate(
    { _id: id },
    { ...req.body, hinhAnh: image }
  );

  if (!DonHang) {
    return res
      .status(400)
      .json({ error: { message: "Bài Viết không tồn tại" } });
  }

  res.status(200).json({ data: [], message: "Cập nhật thành công" });
};

const deleteDonHang = async (req, res) => {
  const { id } = req.params;

  const DonHang = await DonHang.findOneAndDelete({ _id: id });

  if (!DonHang) {
    return res.status(400).json({ error: "Bài viết không tồn tại" });
  }

  res.status(200).json({ data: DonHang, message: "Xoá thành công" });
};

const getDonHangByID = async (req, res) => {
  const { id } = req.params;
  try {
    const DonHang = await DonHang.findOne({ _id: id });
    res.status(200).json({ data: DonHang, message: "Lấy thành công" });
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
