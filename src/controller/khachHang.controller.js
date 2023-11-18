const KhachHang = require("../models/KhachHang");

const getAllKhachHang = async (req, res) => {
  try {
    const KhachHangs = await KhachHang.find({});
    return res.status(200).json({ data: KhachHangs });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getAllKhachHang,
};
