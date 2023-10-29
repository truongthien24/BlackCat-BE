const NhaCungCap = require("../models/NhaCungCap");

const getAllNhaCungCap = async (req, res) => {
    try {
        const NhaCungCaps = await NhaCungCap.find({});
        return res.status(200).json({ data: NhaCungCaps })
    } catch (error) {
        return res.status(400).json({ error });
    }
}
// Thêm nhà cung cấp
const createNhaCungCap = async (req, res) => {
    const { tenNhaCungCap } = req.body;
    try {
        const nhaCungCap = NhaCungCap.create({ tenNhaCungCap })
        res.status(201).json({ message: 'Thêm thành công', data: nhaCungCap });
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = { getAllNhaCungCap, createNhaCungCap };