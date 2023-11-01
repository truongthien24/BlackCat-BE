const TheLoai = require("../models/TheLoai");
const mongoose = require("mongoose");

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
    // const theLoai = await TheLoai.create({ tenTheLoai });
    // res.status(201).json({ message: "Thêm thành công", data: theLoai });
    const checkTrung = await TheLoai.findOne({ tenTheLoai });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên thể loại đã tồn tại",
        },
      });
    } else {
      const theLoai = await TheLoai.create({ tenTheLoai });
      res.status(200).json({ message: "Thêm thành công", data: theLoai });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateTheLoai = async (req, res) => {
  const { id } = req.params;

  console.log("req.body", req.body);

  const theLoai = await TheLoai.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!theLoai) {
    return res.status(400).json({ error: "Thể loại không tồn tại" });
  }

  res.status(200).json({ data: theLoai, message: "Cập nhật thành công" });
};

module.exports = { getAllTheLoai, createTheLoai, updateTheLoai };
