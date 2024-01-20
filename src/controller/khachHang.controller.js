const KhachHang = require("../models/KhachHang");

const getAllKhachHang = async (req, res) => {
  try {
    const KhachHangs = await KhachHang.find({});
    return res.status(200).json({ data: KhachHangs });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const createKhachHang = async (req, res) => {
  const { tenNguoiNhan, userId } = req.body;
  try {
    let ten = tenNguoiNhan.trim();
    let ten1 = ten.replace(/\s+/g, " ");
    const checkTrung = await KhachHang.findOne({
      tenKhachHang: {
        $regex: ten1,
        $options: "i",
      },
      userId: userId
    });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Khách hàng đã tồn tại",
        },
      });
    } else {
      const KhachHang = await KhachHang.create({ ...req.body, tenKhachHang: tenNguoiNhan });
      res.status(200).json({ message: "Thêm thành công", data: KhachHang });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getAllKhachHang,
  createKhachHang,
};
