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

/// Sửa bài viết
// const updateBaiViet = async (req, res) => {
//   const { id } = req.params;

//   const baiViet = await BaiViet.findOneAndUpdate({ _id: id }, { ...req.body });

//   if (!baiViet) {
//     return res.status(400).json({ error: "Bài viết không tồn tại" });
//   }

//   res.status(200).json({ data: baiViet, message: "Cập nhật thành công" });
// };

const updateBaiViet = async (req, res) => {
  const { id } = req.params;
  const baiViet = await BaiViet.findOne({ _id: id });
  const checkTrung = await BaiViet.findOne({
    tenBaiViet: req?.body?.tenBaiViet,
  });
  // Check trùng
  if (checkTrung) {
    if (checkTrung?._id?.toString() === id) {
      const baiVietUpdate = await BaiViet.findOneAndUpdate(
        { _id: id },
        { ...req.body }
      );
      if (!baiVietUpdate) {
        return res.status(400).json({
          error: {
            message: "Bài viết không tồn tại",
          },
        });
      } else {
        res.status(200).json({ data: baiViet, message: "Cập nhật thành công" });
      }
    } else {
      return res.status(400).json({
        error: {
          message: "Tên bài viết đã tồn tại",
        },
      });
    }
  } else {
    const baiVietUpdate = await BaiViet.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!baiVietUpdate) {
      return res.status(400).json({
        error: {
          message: "Bài viết không tồn tại",
        },
      });
    } else {
      res.status(200).json({ data: baiViet, message: "Cập nhật thành công" });
    }
  }
};

const deleteBaiViet = async (req, res) => {
  const { id } = req.params;

  const baiViet = await BaiViet.findOneAndDelete({ _id: id });

  if (!baiViet) {
    return res.status(400).json({ error: "Bài viết không tồn tại" });
  }

  res.status(200).json({ data: baiViet, message: "Xoá thành công" });
};

const getBaiVietByID = async (req, res) => {
  const { id } = req.params;
  try {
    const baiViet = await BaiViet.findOne({ _id: id });
    res.status(200).json({ data: baiViet, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = {
  getAllBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  getBaiVietByID,
};
