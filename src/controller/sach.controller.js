const Sach = require("../models/Sach");
const NhaCungCap = require("../models/NhaCungCap");
const TacGia = require("../models/TacGia");
const TheLoai = require("../models/TheLoai");
const mongoose = require('mongoose');

const getAllSach = async (req, res) => {
  try {
    const sachs = await Sach.find({});
    for (let sach of sachs) {
      if (!mongoose.Types.ObjectId.isValid(sach?.nhaCungCap) || !mongoose.Types.ObjectId.isValid(sach?.theLoai) || !mongoose.Types.ObjectId.isValid(sach?.tacGia)) {
        return res.status(400).json({ error: 'Sach is not found' });
      }
      const nhaCungCap = await NhaCungCap.findById(sach?.nhaCungCap);
      const tacGia = await TacGia.findById(sach?.tacGia);
      const theLoai = await TheLoai.findById(sach?.theLoai);
      sach.nhaCungCap = nhaCungCap?.tenNhaCungCap;
      sach.tacGia = tacGia?.tenTacGia;
      sach.theLoai = theLoai?.tenTheLoai;
    }
    res.status(200).json({ data: sachs, message: 'success' });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const getSachByID = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'Không có data' })
    }
    const sach = await Sach.findById(id);
    if (!sach._id) {
      return res.status(400).json({ error: 'Không có data' });
    }
    res.status(200).json({ data: sach, message: 'success' })
  } catch (error) {
    return res.status(400).json({ error });
  }
}

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
  } = req.body;
  try {
    const checkTrung = await Sach.findOne({ maSach });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: 'Sách đã tồn tại'
        }
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
      });
      res.status(200).json({ message: "Thêm thành công", data: sach });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { getAllSach, createSach, getSachByID };
