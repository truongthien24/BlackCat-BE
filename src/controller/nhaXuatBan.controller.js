const NhaXuatBan = require("../models/NhaXuatBan");
const Sach = require("../models/Sach");

const getAllNhaXuatBan = async (req, res) => {
  try {
    const NhaXuatBans = await NhaXuatBan.find({});
    return res.status(200).json({ data: NhaXuatBans });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Thêm nhà xuất bản
const createNhaXuatBan = async (req, res) => {
  const { tenNXB, quocGia } = req.body;
  try {
    let data = tenNXB.trim();
    let data1 = data.replace(/\s+/g, " ");
    const checkTrung = await NhaXuatBan.findOne({
      tenNXB: {
        $regex: data1,
        $options: "i",
      },
    });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên nhà xuất bản đã tồn tại",
        },
      });
    } else {
      const nhaXuatBan = await NhaXuatBan.create({ tenNXB, quocGia });
      res.status(200).json({ message: "Thêm thành công", data: nhaXuatBan });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateNhaXuatBan = async (req, res) => {
  const { id } = req.params;
  const { tenNXB } = req.body;
  let data = tenNXB.trim();
  let data1 = data.replace(/\s+/g, " ");
  const nhaXuatBan = await NhaXuatBan.findOne({ _id: id });
  const checkTrung = await NhaXuatBan.findOne({
    tenNXB: {
      $regex: data1,
      $options: "i",
    },
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      // if (data1 === nhaXuatBan.tenNXB) {
      //   return res
      //     .status(400)
      //     .json({ error: { message: "Tên nhà xuất bản đã tồn tại" } });
      // }
      const nhaXuatBanUpdate = await NhaXuatBan.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!nhaXuatBanUpdate) {
        return res.status(400).json({
          error: {
            message: "Nhà xuất bản không tồn tại",
          },
        });
      } else {
        res
          .status(200)
          .json({ data: nhaXuatBan, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Nhà xuất bản đã tồn tại",
        },
      });
    }
  } else {
    if (data1.toUpperCase() === nhaXuatBan.tenNXB.toUpperCase()) {
      return res
        .status(400)
        .json({ error: { message: "Tên nhà xuất bản đã tồn tại" } });
    }
    const nhaXuatBanUpdate = await NhaXuatBan.findOneAndUpdate(
      { _id: id },
      { ...req.body, tenNXB: data1 }
    );
    if (!nhaXuatBanUpdate) {
      return res.status(400).json({
        error: {
          message: "Nhà xuất bản không tồn tại",
        },
      });
    } else {
      res
        .status(200)
        .json({ data: nhaXuatBan, message: "Cập nhật thành công" });
    }
  }
};

const deleteNhaXuatBan = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ nhaXuatBan: id });
  if (sach) {
    return res.status(400).json({
      error: {
        message: "Sách đang sử dụng nhà xuất bản này",
      },
    });
  } else {
    const nhaXuatBan = await NhaXuatBan.findOneAndDelete({ _id: id });
    if (!nhaXuatBan) {
      return res.status(400).json({ error: "Nhà Xuất bản không tồn tại" });
    }
    res.status(200).json({ data: nhaXuatBan, message: "Xoá thành công" });
  }
};

const getNhaXuatBanByID = async (req, res) => {
  const { id } = req.params;
  try {
    const nhaXuatBan = await NhaXuatBan.findOne({ _id: id });
    res.status(200).json({ data: nhaXuatBan, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = {
  getAllNhaXuatBan,
  createNhaXuatBan,
  updateNhaXuatBan,
  deleteNhaXuatBan,
  getNhaXuatBanByID,
};
