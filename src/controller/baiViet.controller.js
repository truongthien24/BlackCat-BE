const BaiViet = require("../models/BaiViet");
const { uploadToCloudinary } = require("../utils/uploadFileCloud");

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
  const { tenBaiViet, noiDung, hinhAnh, ngayTao } = req.body;
  try {
    let data = tenBaiViet.trim();
    let data1 = data.replace(/\s+/g, " ");
    const checkTrung = await BaiViet.findOne({
      tenBaiViet: {
        $regex: data1,
        $options: "i",
      },
    });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên bài viết đã tồn tại",
        },
      });
    } else {
      const uploadImage = await uploadToCloudinary(hinhAnh, "baiViets");
      const baiViet = await BaiViet.create({
        tenBaiViet,
        noiDung,
        ngayTao: new Date().toString(),
        hinhAnh: {
          public_id: uploadImage.public_id,
          url: uploadImage.secure_url,
        },
      });
      res.status(200).json({ message: "Thêm thành công", data: baiViet });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateBaiViet = async (req, res) => {
  const { id } = req.params;
  const { hinhAnh } = req.body;
  const { tenBaiViet } = req.body;
  let data = tenBaiViet.trim();
  let data1 = data.replace(/\s+/g, " ");
  let image = {};
  if (hinhAnh?.public_id) {
    image = hinhAnh;
  } else {
    image = await uploadToCloudinary(req.body.hinhAnh.url, "baiViets");
  }
  const baiViet = await BaiViet.findOneAndUpdate(
    { _id: id },
    { ...req.body, hinhAnh: image }
  );

  if (!baiViet) {
    return res
      .status(400)
      .json({ error: { message: "Bài Viết không tồn tại" } });
  }

  res.status(200).json({ data: [], message: "Cập nhật thành công" });
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
