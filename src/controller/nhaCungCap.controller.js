const NhaCungCap = require("../models/NhaCungCap");

const getAllNhaCungCap = async (req, res) => {
    try {
        const NhaCungCaps = await NhaCungCap.find({});
        res.status(200).json({ data: NhaCungCaps })
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

// Lấy một nhà cung cấp
const getNhaCungCapByID = async (req, res) => {
    const {idNhaCungCap} = req.body;
    try {
      const nhaCungCap = await NhaCungCap.findOne({_id: idNhaCungCap});
      res.status(200).json({data: nhaCungCap, message: 'Lấy thành công'})

    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = { getAllNhaCungCap, createNhaCungCap, getNhaCungCapByID };