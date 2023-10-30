const NhaXuatBan = require("../models/NhaXuatBan");

const getAllNhaXuatBan = async (req, res) => {
    try {
        const NhaXuatBans = await NhaXuatBan.find({});
        return res.status(200).json({ data: NhaXuatBans })
    } catch (error) {
        return res.status(400).json({ error });
    }
}
// Thêm nhà xuất bản
const createNhaXuatBan = async (req, res) => {
    const { tenNXB, quocGia } = req.body;
    try {
        const nhaXuatBan = NhaXuatBan.create({ tenNXB, quocGia })
        res.status(201).json({ message: 'Thêm thành công', data: nhaXuatBan });
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = { getAllNhaXuatBan, createNhaXuatBan };