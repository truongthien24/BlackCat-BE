const { default: mongoose } = require("mongoose");
const DanhGia = require("../models/DanhGia");
const Sach = require("../models/Sach");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");
const _ = require("lodash");

const getAllDanhGia = async (req, res) => {
  try {
    const danhGias = await DanhGia.find({})
      .populate({ path: "idTaiKhoan", model: "taiKhoan" })
      .populate({ path: "idSach", model: "sach" });
    const result = await danhGias?.map((danhGia) => {
      return {
        _id: danhGia?._id,
        email: danhGia?.idTaiKhoan?.email,
        tenDangNhap: danhGia?.idTaiKhoan?.tenDangNhap,
        idTaiKhoan: danhGia?.idTaiKhoan,
        tenSach: danhGia?.idSach?.tenSach,
        idSach: danhGia?.idSach,
        noiDung: danhGia?.noiDung,
        hinhAnh: danhGia?.hinhAnh,
        soSao: danhGia?.soSao,
        ngayTao: danhGia?.ngayTao,
        idDanhGiaFather: danhGia?.idDanhGiaFather,
        admin: danhGia?.admin,
      };
    });
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createDanhGia = async (req, res) => {
  const {
    idTaiKhoan,
    idSach,
    idDanhGiaFather,
    noiDung,
    soSao,
    ngayTao,
    hinhAnh = null,
    admin = false,
  } = req.body;
  console.log("body", req.body);
  const tuTucTieu = ["tục", "tiểu", "cc", "đụ mẹ", "..."]; // Thêm các từ khóa cần kiểm tra

  const containsTuTucTieu = tuTucTieu.some((keyword) =>
    noiDung.toLowerCase().includes(keyword)
  );

  if (containsTuTucTieu) {
    return res
      .status(400)
      .json({ error: { message: "Đánh giá chứa từ ngữ không phù hợp" } });
  }
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
      idDanhGiaFather,
      admin,
    });
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
  try {
    const danhGia = await DanhGia.findOneAndDelete({ _id: id });
    if (!danhGia) {
      return res.status(400).json({ error: "Đánh giá không tồn tại" });
    }
    res.status(200).json({ data: {}, message: "Xoá thành công" });
  } catch (err) {
    return res.status(500).json({ error: "Lỗi hệ thống" });
  }
};

const getDanhGiaByID = async (req, res) => {
  const { data } = req.body;
  try {
    const danhGias = await DanhGia.find({ idSach: data?.idSanPham })
      .populate({ path: "idTaiKhoan", model: "taiKhoan" })
      .populate({ path: "idSach", model: "sach" })
      .populate({ path: "idDanhGiaFather", model: "danhGia" });

    let resultDanhGias = danhGias?.filter((danhGia) => danhGia.idDanhGiaFather);
    let resultDanhGiasFather = danhGias
      ?.filter((danhGia) => !danhGia.idDanhGiaFather)
      .map((dg) => {
        return { ...dg._doc, listReply: [] };
      });

    const newDanhGias = _.groupBy(resultDanhGias, (item) => {
      return [item["idDanhGiaFather"]];
    });

    const newResultDanhGias = _.map(
      _.keys(newDanhGias),
      function (e, indexBatch) {
        for (let danhGia of resultDanhGiasFather) {
          if (
            danhGia._id?.toString() ==
            newDanhGias[e][0].idDanhGiaFather._id?.toString()
          ) {
            danhGia.listReply = newDanhGias[e].map((detail) => {
              return detail;
            });
          }
        }
        return {
          Detail: newDanhGias[e].map((detail) => {
            return detail;
          }),
          idDanhGiaFather: newDanhGias[e][0].idDanhGiaFather._id,
        };
      }
    );

    res.status(200).json({
      data: resultDanhGiasFather,
      message: "Lấy thành công",
    });
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
