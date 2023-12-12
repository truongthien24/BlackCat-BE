const { default: mongoose } = require("mongoose");
const DanhGia = require("../models/DanhGia");
const Sach = require("../models/Sach");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

const getAllDanhGia = async (req, res) => {
  try {
    const DanhGias = await DanhGia.find({});
    return res.status(200).json({ data: DanhGias });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createDanhGia = async (req, res) => {
  const {
    idTaiKhoan,
    idSach,
    noiDung,
    soSao,
    ngayTao,
    hinhAnh = null,
  } = req.body;
  try {
    let uploadImage = {};
    if (hinhAnh) {
      uploadImage = await uploadToCloudinary(hinhAnh, "danhGia");
    }
    if (
      !mongoose.Types.ObjectId.isValid(idTaiKhoan) ||
      !mongoose.Types.ObjectId.isValid(idSach)
    ) {
      return res
        .status(400)
        .json({ error: { message: "Tài khoản hoặc sách không tồn tại" } });
    }
    const danhGia = await DanhGia.create({
      idTaiKhoan,
      idSach,
      noiDung,
      soSao,
      ngayTao: new Date().toString(),
      hinhAnh: uploadImage,
    });
    console.log("danhGia", danhGia);
    res.status(200).json({ message: "Thêm thành công", data: danhGia });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

///params
const updateDanhGia = async (req, res) => {
  const { id } = req.params;
  const { tenMaDanhGia } = req.body;
  let ten = tenMaDanhGia.trim();
  let ten1 = ten.replace(/\s+/g, " ");
  const DanhGia = await DanhGia.findOne({ _id: id });
  const checkTrung = await DanhGia.findOne({
    tenMaDanhGia: {
      $regex: ten1,
      $options: "i",
    },
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      const DanhGiaUpdate = await DanhGia.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!DanhGiaUpdate) {
        return res.status(400).json({
          error: {
            message: "Tên mã giảm giá không tồn tại",
          },
        });
      } else {
        res.status(200).json({ data: DanhGia, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Tên mã giảm giá đã tồn tại",
        },
      });
    }
  } else {
    if (ten1.toUpperCase() === DanhGia.tenMaDanhGia.toUpperCase()) {
      return res
        .status(400)
        .json({ error: { message: "Tên mã giảm giá đã tồn tại" } });
    }
    const DanhGiaUpdate = await DanhGia.findOneAndUpdate(
      { _id: id },
      { ...req.body, tenMaDanhGia: ten1 }
    );
    if (!DanhGiaUpdate) {
      return res.status(400).json({
        error: {
          message: "Tên mã giảm giá không tồn tại",
        },
      });
    } else {
      res.status(200).json({ data: DanhGia, message: "Cập nhật thành công" });
    }
  }
};

const deleteDanhGia = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ DanhGia: id });
  if (sach) {
    return res.status(400).json({
      error: {
        message: "Sách đang sử dụng mã giảm giá này",
      },
    });
  } else {
    const DanhGia = await DanhGia.findOneAndDelete({ _id: id });
    if (!DanhGia) {
      return res.status(400).json({ error: "Mã giảm giá không tồn tại" });
    }
    res.status(200).json({ data: DanhGia, message: "Xoá thành công" });
  }
};

const getDanhGiaByID = async (req, res) => {
  const { data } = req.body;
  try {
    const danhGias = await DanhGia.find({ idSach: data?.idSanPham })
      .populate({ path: "idTaiKhoan", model: "taiKhoan" })
      .populate({ path: "idSach", model: "sach" });
    res.status(200).json({ data: danhGias, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getAllDanhGia,
  createDanhGia,
  updateDanhGia,
  deleteDanhGia,
  getDanhGiaByID,
};
