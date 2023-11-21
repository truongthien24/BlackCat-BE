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
      tenNhaCungCap: {
        $regex: data1,
        $options: "i",
      },
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

const createTacGia = async (req, res) => {
  const { tenTacGia, chiTietTacGia } = req.body;
  try {
    let ten = tenTacGia.trim();
    let tenTrim = ten.replace(/\s+/g, " ");
    const checkTrung = await TacGia.findOne({
      tenTacGia: {
        $regex: tenTrim,
        $options: "i",
      },
    });
    console.log(checkTrung);
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên tác giả đã tồn tại",
        },
      });
    } else {
      const tacGia = await TacGia.create({ tenTacGia, chiTietTacGia });
      res.status(200).json({ message: "Thêm thành công", data: tacGia });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// sủa nhà cung cấp
const updateNhaCungCap = async (req, res) => {
  const { id } = req.params;
  const { tenNhaCungCap } = req.body;
  let data = tenNhaCungCap.trim();
  let data1 = data.replace(/\s+/g, " ");
  const nhaCungCap = await NhaCungCap.findOne({ _id: id });
  const checkTrung = await NhaCungCap.findOne({
    tenNhaCungCap: {
      $regex: data1,
      $options: "i",
    },
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      // if (data1 === nhaCungCap.tenNhaCungCap) {
      //   return res
      //     .status(400)
      //     .json({ error: { message: "Tên nhà cung cấp đã tồn tại" } });
      // }
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
    if (data1.toUpperCase() === nhaCungCap.tenNhaCungCap.toUpperCase()) {
      return res
        .status(400)
        .json({ error: { message: "Tên nhà cung cấp đã tồn tại" } });
    }
    const nhaCungCapUpdate = await NhaCungCap.findOneAndUpdate(
      { _id: id },
      { ...req.body, tenNhaCungCap: data1 }
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
// xóa nhà cung cấp
const deleteNhaCungCap = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ nhaCungCap: id });
  console.log(Sach);
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
