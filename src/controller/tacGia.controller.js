const TacGia = require("../models/TacGia");

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
  const { idTacGia } = req.body;
  try {
    const tacGia = await TacGia.findOne({ _id: idTacGia });
    res.status(200).json({ data: tacGia, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Thêm tác giả
const createTacGia = async (req, res) => {
  const { tenTacGia, chiTietTacGia } = req.body;
  try {
    let data = tenTacGia.trim();
    let data1 = data.replace(/\s+/g, " ");
    console.log(data1);
    const checkTrung = await TacGia.findOne({ tenTacGia: data1 });
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

const updateTacGia = async (req, res) => {
  const { id } = req.params;

  console.log("req.body", req.body);
  const tacGia = await TacGia.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!tacGia) {
    return res.status(400).json({ error: "Tác giả không tồn tại" });
  }
  res.status(200).json({ data: tacGia, message: "Cập nhật thành công" });
};

module.exports = { getAllTacGia, createTacGia, updateTacGia, getTacGiaByID };
