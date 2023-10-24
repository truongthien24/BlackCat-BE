const express = require("express");
const { postCreateTaiKhoan, getAllTaiKhoan, loginTaiKhoan} = require("../controller/taiKhoan.controller");
const router = express.Router();

router.post("/create-taiKhoan", postCreateTaiKhoan);
router.get("/getAll-taiKhoan", getAllTaiKhoan);
router.post("/login", loginTaiKhoan)

module.exports = router;