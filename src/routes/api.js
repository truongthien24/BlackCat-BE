const express = require("express");
const { getAllSach, createSach } = require("../controller/sach.controller");
const { getAllTacGia, createTacGia } = require("../controller/tacGia.controller");
const {
  postCreateTaiKhoan,
  getAllTaiKhoan,
  loginTaiKhoan,
  loginAdmin,
} = require("../controller/taiKhoan.controller");
const TaiKhoan = require("../models/TaiKhoan");
const Token = require("../models/token");
const router = express.Router();

// Tài khoản
router.post("/create-taiKhoan", postCreateTaiKhoan);
router.get("/getAll-taiKhoan", getAllTaiKhoan);
router.post("/login", loginTaiKhoan);
router.post("/login-admin", loginAdmin)
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
    // console.log('tokens', tokens)
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
router.post("/createSach", createSach);


// Tác giả
router.get("/getAllTacGia", getAllTacGia);
router.post("/createTacGia", createTacGia);

module.exports = router;
