const express = require("express");
const {
  getAllSach,
  createSach,
  getSachByID,
  deleteSach,
  updateSach,
} = require("../controller/sach.controller");
const {
  getAllTacGia,
  createTacGia,
  updateTacGia,
  getTacGiaByID,
  deleteTacGia,
} = require("../controller/tacGia.controller");
const {
  postCreateTaiKhoan,
  getAllTaiKhoan,
  loginTaiKhoan,
  loginAdmin,
} = require("../controller/taiKhoan.controller");
const TaiKhoan = require("../models/TaiKhoan");
const File = require("../models/File");
const {
  getAllNhaXuatBan,
  createNhaXuatBan,
  updateNhaXuatBan,
  deleteNhaXuatBan,
  getNhaXuatBanByID,
} = require("../controller/nhaXuatBan.controller");
const {
  getAllTheLoai,
  createTheLoai,
  updateTheLoai,
  deleteTheLoai,
  getTheLoaiByID,
} = require("../controller/theLoai.controller");
const {
  getAllNhaCungCap,
  createNhaCungCap,
  getNhaCungCapByID,
  updateNhaCungCap,
  deleteNhaCungCap,
} = require("../controller/nhaCungCap.controller");
const {
  getAllBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  getBaiVietByID,
} = require("../controller/baiViet.controller");
const router = express.Router();

// Tài khoản
router.post("/create-taiKhoan", postCreateTaiKhoan);
router.get("/getAll-taiKhoan", getAllTaiKhoan);
router.post("/login", loginTaiKhoan);
router.post("/login-admin", loginAdmin);
router.get("/taiKhoan/:id/verify/:token", async (req, res) => {
  try {
    const taiKhoan = await TaiKhoan.findOne({ _id: req.params.id });
    if (!taiKhoan) {
      return res.status(400).send({ message: "Invalid link" });
    }
    // const tokens = await Token.findOne({
    //     taiKhoanId: taiKhoan._id,
    //     token: req.params.token,
    // })
    //
    // if (!tokens) {
    //     return res.status(400).send({ message: "Invalid link" });
    // }
    await TaiKhoan.updateOne({ _id: taiKhoan._id }, { xacThucEmail: true });
    // await Token.remove();

    res.status(200).send({ message: "Email verify successfully" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// Sách
router.get("/getAllSach", getAllSach);
router.get("/getSachByID/:id", getSachByID);
router.post("/createSach", createSach);
router.delete("/deleteSach/:id", deleteSach);
router.patch("/updateSach/:id", updateSach);

// Tác giả
router.get("/getAllTacGia", getAllTacGia);
router.post("/createTacGia", createTacGia);
router.patch("/updateTacGia/:id", updateTacGia);
router.get("/getTacGiaByID/:id", getTacGiaByID);
router.delete("/deleteTacGia/:id", deleteTacGia);

//Nhà xuất bản
router.get("/getAllNhaXuatBan", getAllNhaXuatBan);
router.post("/createNhaXuatBan", createNhaXuatBan);
router.patch("/updateNhaXuatBan/:id", updateNhaXuatBan);
router.delete("/deleteNhaXuatBan/:id", deleteNhaXuatBan);
router.get("/getNhaXuatBanByID/:id", getNhaXuatBanByID);

//Thể loại
router.get("/getAllTheLoai", getAllTheLoai);
router.post("/createTheLoai", createTheLoai);
router.patch("/updateTheLoai/:id", updateTheLoai);
router.delete("/deleteTheLoai/:id", deleteTheLoai);
router.get("/getTheLoaiByID/:id", getTheLoaiByID);

//Nhà cung cấp
router.get("/getAllNhaCungCap", getAllNhaCungCap);
router.post("/createNhaCungCap", createNhaCungCap);
router.get("/getNhaCungCapByID/:id", getNhaCungCapByID);
router.patch("/updateNhaCungCap/:id", updateNhaCungCap);
router.delete("/deleteNhaCungCap/:id", deleteNhaCungCap);

// File
router.post("/uploads", async (req, res) => {
  const body = req.body;
  try {
    const newImage = await File.create(body);
    if (newImage) {
      res.status(200).json({ data: newImage, message: "success" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;

/// Bài viết
router.get("/getAllBaiViet", getAllBaiViet);
router.post("/createBaiViet", createBaiViet);
router.patch("/updateBaiViet/:id", updateBaiViet);
router.delete("/deleteBaiViet/:id", deleteBaiViet);
router.get("/getBaiVietByID/:id", getBaiVietByID);
