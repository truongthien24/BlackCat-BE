const { json } = require("body-parser");
const NgonNgu = require("../models/NgonNgu");
const Sach = require("../models/Sach");

const getAllNgonNgu = async (req, res) => {
  try {
    const NgonNgus = await NgonNgu.find({});
    return res.status(200).json({ data: NgonNgus });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Thêm thể loại
const createNgonNgu = async (req, res) => {
  const { tenNgonNgu } = req.body;
  try {
    let data = tenNgonNgu.trim();
    let data1 = data.replace(/\s+/g, " ");
    const checkTrung = await NgonNgu.findOne({
      tenNgonNgu: {
        $regex: data1,
        $options: "i",
      },
    });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên ngôn ngữ đã tồn tại",
        },
      });
    } else {
      const ngonNgu = await NgonNgu.create({
        tenNgonNgu,
      });
      res.status(200).json({ message: "Thêm thành công", data: ngonNgu });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateNgonNgu = async (req, res) => {
  const { id } = req.params;
  const { tenNgonNgu } = req.body;
  let data = tenNgonNgu.trim();
  let data1 = data.replace(/\s+/g, " ");
  const ngonNgu = await NgonNgu.findOne({ _id: id });
  const checkTrung = await NgonNgu.findOne({
    tenNgonNgu: {
      $regex: data1,
      $options: "i",
    },
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      // if (data1 === ngonNgu.tenNgonNgu) {
      //   return res
      //     .status(400)
      //     .json({ error: { message: "Tên ngôn ngữ đã tồn tại" } });
      // }
      const ngonNguUpdate = await NgonNgu.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!ngonNguUpdate) {
        return res.status(400).json({
          error: {
            message: "Ngôn ngữ không tồn tại",
          },
        });
      } else {
        res.status(200).json({ data: ngonNgu, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Tên ngôn ngữ đã tồn tại",
        },
      });
    }
  } else {
    if (data1.toUpperCase() === ngonNgu.tenNgonNgu.toUpperCase()) {
      return res
        .status(400)
        .json({ error: { message: "Tên ngôn ngữ đã tồn tại" } });
    }
    const ngonNguUpdate = await NgonNgu.findOneAndUpdate(
      { _id: id },
      { ...req.body, tenNgonNgu: data1 }
    );
    if (!ngonNguUpdate) {
      return res.status(400).json({
        error: {
          message: "Ngôn ngữ không tồn tại",
        },
      });
    } else {
      res.status(200).json({ data: ngonNgu, message: "Cập nhật thành công" });
    }
  }
};

const deleteNgonNgu = async (req, res) => {
  const { id } = req.params;
  const sach = await Sach.findOne({ ngonNgu: id });
  if (sach) {
    return res.status(400).json({
      error: {
        message: "Sách đang sử dụng ngôn ngữ này",
      },
    });
  } else {
    const ngonNgu = await NgonNgu.findOneAndDelete({ _id: id });
    if (!ngonNgu) {
      return res.status(400).json({ error: "Ngôn ngữ không tồn tại" });
    }
    res.status(200).json({ data: ngonNgu, message: "Xoá thành công" });
  }
};

const getNgonNguByID = async (req, res) => {
  const { id } = req.params;
  try {
    const ngonNgu = await NgonNgu.findOne({ _id: id });
    res.status(200).json({ data: ngonNgu, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getAllNgonNgu,
  createNgonNgu,
  updateNgonNgu,
  deleteNgonNgu,
  getNgonNguByID,
};
