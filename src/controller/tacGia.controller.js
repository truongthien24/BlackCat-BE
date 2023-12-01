const TacGia = require("../models/TacGia");
const Sach = require("../models/Sach");
const { json } = require("body-parser");

const getAllTacGia = async (req, res) => {
  try {
    const TacGias = await TacGia.find({});
    return res.status(200).json({ data: TacGias });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Lấy một tác giả
const getTacGiaByID = async (req, res) => {
  const { id } = req.params;
  try {
    const tacGia = await TacGia.findOne({ _id: id });
    res.status(200).json({ data: tacGia, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Thêm tác giả
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

///params
const updateTacGia = async (req, res) => {
  const { id } = req.params;
  const { tenTacGia } = req.body;
  let ten = tenTacGia.trim();
  let tenTrim = ten.replace(/\s+/g, " ");
  const tacGia = await TacGia.findOne({ _id: id });
  const checkTrung = await TacGia.findOne({
    tenTacGia: {
      $regex: tenTrim,
      $options: "i",
    },
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      // if (tenTrim === tacGia.tenTacGia) {
      //   return res
      //     .status(400)
      //     .json({ error: { message: "Tên tác giả đã tồn tại" } });
      // }
      const tacGiaUpdate = await TacGia.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!tacGiaUpdate) {
        return res.status(400).json({
          error: {
            message: "Tác giả không tồn tại",
          },
        });
      } else {
        res.status(200).json({ data: tacGia, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Tên tác giả đã tồn tại",
        },
      });
    }
  } else {
    if (tenTrim.toUpperCase() === tacGia.tenTacGia.toUpperCase()) {
      return res
        .status(400)
        .json({ error: { message: "Tên tác giả đã tồn tại" } });
    }
    const tacGiaUpdate = await TacGia.findOneAndUpdate(
      { _id: id },
      { ...req.body, tenTacGia: tenTrim }
    );
    if (!tacGiaUpdate) {
      return res.status(400).json({
        error: {
          message: "Tác giả không tồn tại",
        },
      });
    } else {
      res.status(200).json({ data: tacGia, message: "Cập nhật thành công" });
    }
  }
};

const deleteTacGia = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ tacGia: id });
  if (sach) {
    return res.status(400).json({
      error: {
        message: "Sách đang sử dụng tác giả này",
      },
    });
  } else {
    const tacGia = await TacGia.findOneAndDelete({ _id: id });
    if (!tacGia) {
      return res.status(400).json({ error: "Tác giả không tồn tại" });
    }
    res.status(200).json({ data: tacGia, message: "Xoá thành công" });
  }
};
module.exports = {
  getAllTacGia,
  createTacGia,
  updateTacGia,
  getTacGiaByID,
  deleteTacGia,
};
