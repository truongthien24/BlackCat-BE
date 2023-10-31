const TacGia = require("../models/TacGia");

const getAllTacGia = async (req, res) => {
  try {
    const TacGias = await TacGia.find({});
    return res.status(200).json({ data: TacGias });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// Thêm tác giả
const createTacGia = async (req, res) => {
  const { tenTacGia, chiTietTacGia } = req.body;
  try {
    const tacGia = TacGia.create({ tenTacGia, chiTietTacGia });
    res.status(201).json({ message: "create success", data: tacGia });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = { getAllTacGia, createTacGia };
