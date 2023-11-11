const Sach = require("../models/Sach");
const gzip = require("gzip");
const NhaCungCap = require("../models/NhaCungCap");
const TacGia = require("../models/TacGia");
const TheLoai = require("../models/TheLoai");
const NhaXuatBan = require("../models/NhaXuatBan");
const mongoose = require("mongoose");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

const getAllSach = async (req, res) => {
  try {
    const sachs = await Sach.find()
      .populate({ path: "nhaCungCap", model: "nhaCungCap" })
      .populate({ path: "tacGia", model: "tacGia" })
      .populate({ path: "theLoai", model: "theLoai" })
      .populate({ path: "nhaXuatBan", model: "nhaXuatBan" });
    const result = await sachs?.map((sach) => {
      return {
        _id: sach._id,
        tenSach: sach.tenSach,
        tenNhaCungCap: sach?.nhaCungCap?.tenNhaCungCap,
        maNhaCungCap: sach?.nhaCungCap?._id?.toString(),
        tenTheLoai: sach?.theLoai?.tenTheLoai,
        maTheLoai: sach?.theLoai?._id?.toString(),
        tenNhaXuatBan: sach?.nhaXuatBan?.tenNXB,
        maNhaXuatBan: sach?.nhaXuatBan?._id?.toString(),
        tenTacGia: sach?.tacGia?.tenTacGia,
        maTacGia: sach?.tacGia?._id?.toString(),
        soLuong: sach.soLuong,
        maSach: sach.maSach,
        gia: sach.gia,
        namXuatBan: sach.namXuatBan,
        tinhTrang: sach.tinhTrang,
        hinhAnh: sach.hinhAnh,
      };
    });
    res.status(200).json({ data: result, message: "success" });
  } catch (error) {
    return res.status(400).json({
      error: {
        message: error,
      },
    });
  }
};

const getSachByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Không có data" });
    }
    const sach = await Sach.findById(id)
      .populate({ path: "nhaCungCap", model: "nhaCungCap" })
      .populate({ path: "tacGia", model: "tacGia" })
      .populate({ path: "theLoai", model: "theLoai" })
      .populate({ path: "nhaXuatBan", model: "nhaXuatBan" });
    if (!sach._id) {
      return res.status(400).json({ error: "Không có data" });
    }
    const result = {
      _id: sach._id,
      tenSach: sach.tenSach,
      tenNhaCungCap: sach?.nhaCungCap?.tenNhaCungCap,
      maNhaCungCap: sach?.nhaCungCap?._id?.toString(),
      tenTheLoai: sach?.theLoai?.tenTheLoai,
      maTheLoai: sach?.theLoai?._id?.toString(),
      tenNhaXuatBan: sach?.nhaXuatBan?.tenNXB,
      maNhaXuatBan: sach?.nhaXuatBan?._id?.toString(),
      tenTacGia: sach?.tacGia?.tenTacGia,
      maTacGia: sach?.tacGia?._id?.toString(),
      noiDung: sach.noiDung,
      soLuong: sach.soLuong,
      maSach: sach.maSach,
      gia: sach.gia,
      namXuatBan: sach.namXuatBan,
      tienCoc: sach.tienCoc,
      tinhTrang: sach.tinhTrang,
      hinhAnh: sach.hinhAnh,
      kichThuoc: sach.kichThuoc,
      soTrang: sach.soTrang,
      ngonNgu: sach.ngonNgu,
      quocGia: sach.quocGia,
    };
    res.status(200).json({ data: result, message: "success" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createSach = async (req, res) => {
  const {
    tenSach,
    maSach,
    namXuatBan,
    tacGia,
    nhaXuatBan,
    tienCoc,
    theLoai,
    soLuong,
    gia,
    noiDung,
    tinhTrang,
    nhaCungCap,
    hinhAnh,
    quocGia,
    ngonNgu,
    soTrang,
    kichThuoc,
  } = req.body;
  try {
    const checkTrung = await Sach.findOne({ maSach });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Sách đã tồn tại",
        },
      });
    } else {
      const uploadImage = await uploadToCloudinary(hinhAnh, "sachs");

      const sach = await Sach.create({
        tenSach,
        maSach,
        namXuatBan,
        tacGia,
        nhaXuatBan,
        tienCoc,
        theLoai,
        soLuong,
        gia,
        noiDung,
        tinhTrang,
        nhaCungCap,
        quocGia,
        ngonNgu,
        soTrang,
        kichThuoc,
        hinhAnh: {
          public_id: uploadImage.public_id,
          url: uploadImage.secure_url,
        },
      });
      res.status(200).json({ message: "Thêm thành công", data: sach });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateSach = async (req, res) => {
  const { id } = req.params;

  const { hinhAnh } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: { message: "Sách không tồn tại" } });
  }

  // const uploadImage = await uploadToCloudinary(req.body.hinhAnh, "sachs");
  let image = {};

  if (hinhAnh?.public_id) {
    image = hinhAnh;
  } else {
    image = await uploadToCloudinary(req.body.hinhAnh.url, "sachs");
  }
  const sach = await Sach.findOneAndUpdate(
    { _id: id },
    { ...req.body, hinhAnh: image }
  );

  if (!sach) {
    return res.status(400).json({ error: { message: "Sách không tồn tại" } });
  }

  res.status(200).json({ data: [], message: "Cập nhật thành công" });
};

const deleteSach = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: { message: "Sách không tồn tại" } });
  }

  const sach = await Sach.findOneAndDelete({ _id: id });

  if (!sach) {
    return res.status(400).json({ error: { message: "Sách không tồn tại" } });
  }

  res.status(200).json({ data: sach, message: "Xoá thành công" });
};

module.exports = {
  getAllSach,
  createSach,
  getSachByID,
  updateSach,
  deleteSach,
};
