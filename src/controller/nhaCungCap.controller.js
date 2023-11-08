const NhaCungCap = require("../models/NhaCungCap");
const Sach = require("../models/Sach");
const { json } = require("body-parser");

const getAllNhaCungCap = async (req, res) => {
  try {
    const NhaCungCaps = await NhaCungCap.find({});
    res.status(200).json({ data: NhaCungCaps });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// Thêm nhà cung cấp
const createNhaCungCap = async (req, res) => {
  const { tenNhaCungCap, diaChiNhaCungCap, soDienThoai } = req.body;
  try {
    let data = tenNhaCungCap.trim();
    let data1 = data.replace(/\s+/g, " ");
    const checkTrung = await NhaCungCap.findOne({
      tenNhaCungCap: data1
    });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên nhà cung cấp đã tồn tại",
        },
      });
    } else {
      const nhaCungCap = await NhaCungCap.create({
        tenNhaCungCap,
        diaChiNhaCungCap,
        soDienThoai,
      });
      res.status(200).json({ message: "Thêm thành công", data: nhaCungCap });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// sửa nhà cung cấp
const updateNhaCungCap = async (req, res) => {
  const { id } = req.params;
  const nhaCungCap = await NhaCungCap.findOne({ _id: id });
  const checkTrung = await NhaCungCap.findOne({
    tenNhaCungCap: req?.body?.tenNhaCungCap,
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      const nhaCungCapUpdate = await NhaCungCap.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!nhaCungCapUpdate) {
        return res.status(400).json({
          error: {
            message: "Nhà cung cấp không tồn tại",
          },
        });
      } else {
        res
          .status(200)
          .json({ data: nhaCungCap, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Tên nhà cung cấp đã tồn tại",
        },
      });
    }
  } else {
    const nhaCungCapUpdate = await NhaCungCap.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!nhaCungCapUpdate) {
      return res.status(400).json({
        error: {
          message: "Nhà cung cấp không tồn tại",
        },
      });
    } else {
      res
        .status(200)
        .json({ data: nhaCungCap, message: "Cập nhật thành công" });
    }
  }
};

// Lấy một nhà cung cấp
const getNhaCungCapByID = async (req, res) => {
  const { id } = req.params;
  try {
    const nhaCungCap = await NhaCungCap.findOne({ _id: id });
    res.status(200).json({ data: nhaCungCap, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const deleteNhaCungCap = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ nhaCungCap: id });
  if (sach) {
    return res.status(400).json({
      error: {
        message: "Sách đang sử dụng nhà cung cấp này",
      },
    });
  } else {
    const nhaCungCap = await NhaCungCap.findOneAndDelete({ _id: id });
    if (!nhaCungCap) {
      return res.status(400).json({ error: "Nhà cung cấp không tồn tại" });
    }
    res.status(200).json({ data: nhaCungCap, message: "Xoá thành công" });
  }
};

module.exports = {
  getAllNhaCungCap,
  createNhaCungCap,
  getNhaCungCapByID,
  updateNhaCungCap,
  deleteNhaCungCap,
};
