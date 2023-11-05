const NhaXuatBan = require("../models/NhaXuatBan");

const getAllNhaXuatBan = async (req, res) => {
  try {
    const NhaXuatBans = await NhaXuatBan.find({});
    return res.status(200).json({ data: NhaXuatBans });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// Thêm nhà xuất bản
const createNhaXuatBan = async (req, res) => {
  const { tenNXB, quocGia } = req.body;
  try {
    let data = tenNXB.trim();
    let data1 = data.replace(/\s+/g, " ");
    console.log({ data1 });

    const checkTrung = await NhaXuatBan.findOne({ tenNXB: data1 });
    if (checkTrung?._id) {
      res.status(400).json({
        error: {
          message: "Tên nhà xuất bản đã tồn tại",
        },
      });
    } else {
      const nhaXuatBan = await NhaXuatBan.create({ tenNXB, quocGia });
      res.status(200).json({ message: "Thêm thành công", data: nhaXuatBan });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const updateNhaXuatBan = async (req, res) => {
  const { id } = req.params;

  console.log("req.body", req.body);

  const nhaXuatBan = await NhaXuatBan.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );
  if (!nhaXuatBan) {
    return res.status(400).json({ error: "Nhà xuất bản không tồn tại" });
  }
  res.status(200).json({ data: nhaXuatBan, message: "Cập nhật thành công" });
};

const deleteNhaXuatBan = async (req, res) => {
  const { id } = req.params;

  const nhaXuatBan = await NhaXuatBan.findOneAndDelete({ _id: id });

  if (!nhaXuatBan) {
    return res.status(400).json({ error: "Nhà xuất bản không tồn tại" });
  }

  res.status(200).json({ data: nhaXuatBan, message: "Xoá thành công" });
};

const getNhaXuatBanByID = async (req, res) => {
  const { idNhaXuatBan } = req.body;
  try {
    const nhaXuatBan = await NhaXuatBan.findOne({ _id: idNhaXuatBan });
    res.status(200).json({ data: nhaXuatBan, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = {
  getAllNhaXuatBan,
  createNhaXuatBan,
  updateNhaXuatBan,
  deleteNhaXuatBan,
  getNhaXuatBanByID,
};
