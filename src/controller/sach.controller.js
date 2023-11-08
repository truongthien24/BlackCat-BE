const Sach = require("../models/Sach");
const NhaCungCap = require("../models/NhaCungCap");
const TacGia = require("../models/TacGia");
const TheLoai = require("../models/TheLoai");
const NhaXuatBan = require("../models/NhaXuatBan");
const mongoose = require("mongoose");

const getAllSach = async (req, res) => {
  try {
    const sachs = await Sach.find({});
    for (let sach of sachs) {
      if (
        !mongoose.Types.ObjectId.isValid(sach?.nhaCungCap) ||
        !mongoose.Types.ObjectId.isValid(sach?.theLoai) ||
        !mongoose.Types.ObjectId.isValid(sach?.tacGia) ||
        !mongoose.Types.ObjectId.isValid(sach?.nhaXuatBan)
      ) {
        return res.status(400).json({ error: "Sach is not found" });
      }

      const nhaCungCap = await NhaCungCap.findById(sach?.nhaCungCap);
      const tacGia = await TacGia.findById(sach?.tacGia);
      const theLoai = await TheLoai.findById(sach?.theLoai);
      const nhaXuatBan = await NhaXuatBan.findById(sach?.nhaXuatBan);
      sach.nhaCungCap = nhaCungCap?.tenNhaCungCap;
      sach.tacGia = tacGia?.tenTacGia;
      sach.theLoai = theLoai?.tenTheLoai;
      sach.nhaXuatBan = nhaXuatBan?.tenNXB;
    }
    res.status(200).json({ data: sachs, message: "success" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getSachByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Không có data" });
    }
    const sach = await Sach.findById(id);
    if (!sach._id) {
      return res.status(400).json({ error: "Không có data" });
    }
    res.status(200).json({ data: sach, message: "success" });
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
        hinhAnh,
      });
      res.status(200).json({ message: "Thêm thành công", data: sach });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateSach = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Sách không tồn tại" });
  }

  const sach = await Sach.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!sach) {
    return res.status(400).json({ error: "Sách không tồn tại" });
  }

  res.status(200).json({ data: sach, message: "Cập nhật thành công" });
};

const deleteSach = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Sách không tồn tại" });
  }

  const sach = await Sach.findOneAndDelete({ _id: id });

  if (!sach) {
    return res.status(400).json({ error: "Sách không tồn tại" });
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
