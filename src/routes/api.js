const express = require("express");
const { postCreateTaiKhoan, getAllTaiKhoan, loginTaiKhoan} = require("../controller/taiKhoan.controller");
const router = express.Router();

router.post("/create-taiKhoan", postCreateTaiKhoan);
router.get("/getAll-taiKhoan", getAllTaiKhoan);
router.post("/login", loginTaiKhoan)


// Post gửi dữ liệu từ client lên server
// GET lấy dữ liệu từ server về client
// PUT sửa dữ liệu 
// DELETE xoá dữ liệu

module.exports = router;