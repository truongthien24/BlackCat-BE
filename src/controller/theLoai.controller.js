const TheLoai = require("../models/TheLoai");

const getAllTheLoai = async (req, res) => {
    try {
        const TheLoais = await TheLoai.find({});
        return res.status(200).json({ data: TheLoais })
    } catch (error) {
        return res.status(400).json({ error });
    }
}
// Thêm thể loại
const createTheLoai = async (req, res) => {
    const { tenTheLoai } = req.body;
    try {
        const theLoai = TheLoai.create({ tenTheLoai })
        res.status(201).json({ message: 'Thêm thành công', data: theLoai });
    } catch (error) {
        return res.status(400).json({ error })
    }
}

module.exports = { getAllTheLoai, createTheLoai };