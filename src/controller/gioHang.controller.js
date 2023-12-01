const GioHang = require("../models/GioHang");
const Sach = require("../models/Sach");
const { json } = require("body-parser");

const getAllGioHang = async (req, res) => {
  try {
    const gioHangs = await GioHang.find({});
    return res.status(200).json({ data: gioHangs });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Lấy một tác giả
const getGioHangByID = async (req, res) => {
  const { id } = req.params;
  try {
    const gioHang = await GioHang.findOne({ _id: id }).populate(
      "danhSach.sach"
    );
    res.status(200).json({ data: gioHang, message: "Lấy thành công" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// Thêm, chỉnh sửa giỏ hàng
const updateGioHang = async (req, res) => {
  const { id, sach, insert = false, update = false } = req.body;
  try {
    let gioHangOld = await GioHang.findOne({ _id: id }).populate(
      "danhSach.sach"
    );
    if (!gioHangOld) {
      return res
        .status(400)
        .json({ error: { message: "Không tìm thấy giỏ hàng" } });
    } else {
      // Kiểm tra xem insert sách mới hay update số lượng sách
      if (insert) {
        // Kiểm tra sách cũ trong giỏ hàng có tồn tại hay không
        // const checkSach = gioHangOld.findOne
        const index = gioHangOld?.danhSach?.findIndex(
          (s) => s.sach._id.toString() === sach.idSach
        );
        // Nếu không tồn tại thì thêm sách vào
        if (index === -1) {
          gioHangOld.danhSach.push({
            sach: sach.idSach,
            soLuong: sach.soLuong,
            soNgayThue: sach.soNgayThue
          });
        }
        // Nếu tồn tại thì cộng số lượng
        else {
          gioHangOld.danhSach[index].soLuong += sach.soLuong;
        }
        const gioHangNew = await GioHang.findOneAndUpdate(
          { _id: id },
          {
            danhSach: gioHangOld.danhSach,
          }
        );
        if (gioHangNew) {
          res.status(200).json({ message: "Thành công", data: gioHangNew });
        } else {
          return res.status(400).json({ error: { message: "Thất bại" } });
        }
      }
      else if (update) {
        const gioHangNew = await GioHang.findOneAndUpdate(
          { _id: id },
          {
            danhSach: sach,
          }
        );

        if (gioHangNew) {
          res.status(200).json({ message: "Thành công", data: gioHangNew });
        } else {
          return res.status(400).json({ error: { message: "Thất bại" } });
        }
      }
    }
  } catch (error) {
    return res.status(400).json({ error: { message: "Thất bại" } });
  }

  // const gioHangUpdate = await GioHang.findOneAndUpdate(
  //   { _id: req.body.id },
  //   { ...req.body }
  // );
  // if (!gioHangUpdate) {
  //   return res.status(400).json({
  //     error: {
  //       message: "Giỏ hàng không tồn tại",
  //     },
  //   });
  // } else {
  //   res
  //     .status(200)
  //     .json({ data: gioHangUpdate, message: "Cập nhật thành công" });
  // }
};

// Xóa item khỏi giỏ hàng


// Check sản phẩm trước khi sang bước thanh toán
const checkSanPham = async (req, res) => {
  const { danhSach } = req.body;
  try {
    for (let sach of danhSach) {
      const check = await Sach.findOne({ _id: sach?.sach?._id });
      console.log('check', check);
      console.log('soLuong', sach?.soLuong);
      if (check) {
        if (check?.soLuong < sach?.soLuong) {
          return res.status(400).json({ error: { message: `Sách ${check?.tenSach} không đủ số lượng trong kho` } })
        }
      } else {
        return res.status(400).json({ error: { message: `Sách không tồn tại` } })
      }
    }
    res.status(200).json({ message: 'Kiểm tra hoàn tất' })
  } catch (error) {
    return res.status(400).json({ error: { message: error } })
  }
}

module.exports = {
  getAllGioHang,
  updateGioHang,
  getGioHangByID,
  checkSanPham,
};
