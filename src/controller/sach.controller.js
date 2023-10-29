const Sach = require("../models/Sach");

const getAllSach = async (req, res) => {
  try {
    const sachs = await Sach.find({});
    return res.status(200).json({ data: sachs });
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
    tenNhaCungCap,
  } = req.body;
  try {
    const sach = Sach.create({
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
      tenNhaCungCap,
    });
    res.status(201).json({ message: "Thêm thành công", data: sach });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { getAllSach, createSach };
