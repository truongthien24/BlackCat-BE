const Sach = require("../models/Sach");

const getAllSach = async (req, res) => {
    try {
        const sachs = await Sach.find({});
        return res.status(200).json({data: sachs})
    } catch (error) {
        return res.status(400).json({error});
    }
}

const createSach = async (req, res) => {
    const {tenSach, maSach, namXuatBan, tacGia, nhaXuatBan, tienCoc, loaiSach, soLuong, gia} = req.body;
    try {
        const sach = Sach.create({tenSach, maSach, namXuatBan, tacGia, nhaXuatBan, tienCoc, loaiSach, soLuong, gia})
        res.status(201).json({ message: 'create success', data: sach });
    } catch (error) {
        return res.status(400).json({error})
    }
}

module.exports = {getAllSach, createSach};