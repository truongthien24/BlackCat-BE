const BaiViet = require("../models/BaiViet");

const getAllBaiViet = async (req, res) => {
  try {
    const BaiViets = await BaiViet.find({});
    res.status(200).json({ data: BaiViets });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

///
const createBaiViet = async (req, res) => {
  const { tenBaiViet, noiDung, hinhAnh } = req.body;
  try {
    let data = tenBaiViet.trim();
    let data1 = data.replace(/\s+/g, " ");
    console.log({ data1 });
    const checkTrung = await BaiViet.findOne({ tenBaiViet: data1 });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên bài viết đã tồn tại",
        },
      });
    } else {
      const baiViet = await BaiViet.create({ tenBaiViet, noiDung, hinhAnh });
      res.status(200).json({ message: "Thêm thành công", data: baiViet });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const updateBaiViet = async (req, res) => {
  const { id } = req.params;

  console.log("req.body", req.body);

  const baiViet = await BaiViet.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!baiViet) {
    return res.status(400).json({ error: "Bài viết không tồn tại" });
  }

  res.status(200).json({ data: baiViet, message: "Cập nhật thành công" });
};

const deleteBaiViet = async (req, res) => {
  const { id } = req.params;

  const baiViet = await BaiViet.findOneAndDelete({ _id: id });

  if (!baiViet) {
    return res.status(400).json({ error: "Bài viết không tồn tại" });
  }

  res.status(200).json({ data: baiViet, message: "Xoá thành công" });
};

module.exports = { getAllBaiViet, createBaiViet, updateBaiViet, deleteBaiViet };
