const express = require("express");
const { postCreateTaiKhoan, getAllTaiKhoan, loginTaiKhoan } = require("../controller/taiKhoan.controller");
const TaiKhoan = require("../models/TaiKhoan");
const Token = require("../models/token");
const router = express.Router();

router.post("/create-taiKhoan", postCreateTaiKhoan);
router.get("/getAll-taiKhoan", getAllTaiKhoan);
router.post("/login", loginTaiKhoan)
router.get("/taiKhoan/:id/verify/:token", async (req, res) => {
    try {
        const taiKhoan = await TaiKhoan.findOne({ _id: req.params.id });
        if (!taiKhoan) {
            return res.status(400).send({ message: "Invalid link" });
        }
        const tokens = await Token.findOne({
            taiKhoanId: taiKhoan._id,
            token: req.params.token,
        })
        if (!tokens) {
            return res.status(400).send({ message: "Invalid link" });
        }
        await TaiKhoan.updateOne({ _id: user._id, xacThucEmail: true })
        await Token.remove();

        res.status(200).send({ message: 'Email verify successfully' })
    } catch (error) {
        res.status(400).send({ error })
    }
})


// Post gửi dữ liệu từ client lên server
// GET lấy dữ liệu từ server về client
// PUT sửa dữ liệu 
// DELETE xoá dữ liệu

module.exports = router;