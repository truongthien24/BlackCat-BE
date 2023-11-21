const { json } = require("body-parser");
const TheLoai = require("../models/TheLoai");
const mongoose = require("mongoose");
const Sach = require("../models/Sach");

const getAllTheLoai = async (req, res) => {
  try {
    const TheLoais = await TheLoai.find({});
    return res.status(200).json({ data: TheLoais });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Thêm thể loại
const createTheLoai = async (req, res) => {
  const { tenTheLoai } = req.body;
  try {
    let data = tenTheLoai.trim();
    let data1 = data.replace(/\s+/g, " ");
    const checkTrung = await TheLoai.findOne({
      tenTheLoai: {
        $regex: data1,
        $options: "i",
      },
    });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên thể loại đã tồn tại",
        },
      });
    } else {
      const theLoai = await TheLoai.create({
        tenTheLoai,
      });
      res.status(200).json({ message: "Thêm thành công", data: theLoai });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateTheLoai = async (req, res) => {
  const { id } = req.params;
  const { tenTheLoai } = req.body;
  let data = tenTheLoai.trim();
  let data1 = data.replace(/\s+/g, " ");
  const theLoai = await TheLoai.findOne({ _id: id });
  const checkTrung = await TheLoai.findOne({
    tenTheLoai: {
      $regex: data1,
      $options: "i",
    },
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      // if (data1 === theLoai.tenTheLoai) {
      //   return res
      //     .status(400)
      //     .json({ error: { message: "Tên thể loại đã tồn tại" } });
      // }
      const theLoaiUpdate = await TheLoai.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!theLoaiUpdate) {
        return res.status(400).json({
          error: {
            message: "Thể loại không tồn tại",
          },
        });
      } else {
        res.status(200).json({ data: theLoai, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Tên thể loại đã tồn tại",
        },
      });
    }
  } else {
    if (data1.toUpperCase() === theLoai.tenTheLoai.toUpperCase()) {
      return res
        .status(400)
        .json({ error: { message: "Tên thể loại đã tồn tại" } });
    }
    const theLoaiUpdate = await TheLoai.findOneAndUpdate(
      { _id: id },
      { ...req.body, tenTheLoai: data1 }
    );
    if (!theLoaiUpdate) {
      return res.status(400).json({
        error: {
          message: "Thể loại không tồn tại",
        },
      });
    } else {
      res.status(200).json({ data: theLoai, message: "Cập nhật thành công" });
    }
  }
};

const deleteTheLoai = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ theLoai: id });
  if (sach) {
    return res.status(400).json({
      error: {
        message: "Sách đang sử dụng thể loại này",
      },
    });
  } else {
    const theLoai = await TheLoai.findOneAndDelete({ _id: id });
    if (!theLoai) {
      return res.status(400).json({ error: "Thể loại không tồn tại" });
    }
    res.status(200).json({ data: theLoai, message: "Xoá thành công" });
  }
};

const getTheLoaiByID = async (req, res) => {
  const { id } = req.params;
  try {
    const theLoai = await TheLoai.findOne({ _id: id });
    res.status(200).json({ data: theLoai, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getAllTheLoai,
  createTheLoai,
  updateTheLoai,
  deleteTheLoai,
  getTheLoaiByID,
};
