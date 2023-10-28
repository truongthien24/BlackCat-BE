const TaiKhoan = require("../models/TaiKhoan");
const jwt = require("jsonwebtoken");
const token = require('../models/token');
const sendEmail = require('../utils/sendEmail');

const getAllTaiKhoan = async (req, res) => {
  try {
    const users = await TaiKhoan.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginTaiKhoan = async (req, res) => {
  const { tenDangNhap, matKhau } = req?.body;
  try {

    const users = await TaiKhoan.findOne({ tenDangNhap, matKhau });
    console.log('users', users)
    if (users.tenDangNhap === tenDangNhap && users.matKhau === matKhau) {
      if(users.loaiTaiKhoan === "admin" || users.loaiTaiKhoan === "employee" ) {
        return res.status(400).send({
          error: "Tài khoản không được cấp quyền"
        })
      }
      if(users.xacThucEmail) {
        const id = users?._id;
        // Đăng ký token
        const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
        // Thành công trả về status 200 và message
        return res.status(200).json({
          Success: true,
          token,
          Data: {
            tenDangNhap: users?.tenDangNhap,
            email: users?.email,
            // email: results[0]?.email,
            // id: results[0]?.id,
            // name: results[0]?.name,
          },
          Message: "Login sucess!",
        });
      } else {
        return res.status(400).send({
          error: "Tài khoản chưa được xác thực email"
        })
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác" });
  }
};

const postCreateTaiKhoan = async (req, res) => {
  const { tenDangNhap, matKhau, email, loaiTaiKhoan } = req?.body;
  try {
    // const res = TaiKhoan.collection.aggregate([
    //   {
    //     "$group": {
    //       _id: "$tenDangNhap",
    //       id: {
    //         "$first": "$_id"
    //       }
    //     }
    //   }
    // ])

    // Check trùng
    const checkTrung = await TaiKhoan.findOne({ tenDangNhap });
    if (checkTrung?._id) {
      res.status(400).json({ error: 'Tài khoản đã tồn tại' });
    } else {
      // const hashPassword = ""
      const user = await TaiKhoan.create({ tenDangNhap, matKhau, email, loaiTaiKhoan, xacThucEmail: false });
      const tokens = await token.create({
        taiKhoanId: user._id,
        token: jwt.sign({ id: user._id }, "jwtSecretKey", { expiresIn: 300 }),
      })
      const url = `localhost:3000/${user._id}/verify/${tokens.token}`;
      await sendEmail(user.email, "Verify Email", url);
      res.status(201).send({ message: 'An email sent to your account please verify' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { tenDangNhap, matKhau } = req?.body;
  try {

    const users = await TaiKhoan.findOne({ tenDangNhap, matKhau });
    if (users.tenDangNhap === tenDangNhap && users.matKhau === matKhau) {
      if(users.loaiTaiKhoan === "admin" || users.loaiTaiKhoan === "employee") {
        const id = users?._id;
        // Đăng ký token
        const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
        // Thành công trả về status 200 và message
        return res.status(200).json({
          Success: true,
          token,
          Data: {
            tenDangNhap: users?.tenDangNhap,
            email: users?.email,
          },
          Message: "Login sucess!",
        });
      }
      else {
        return res.status(400).json({
          error: "Tài khoản không được cấp quyền"
        })
      } 
    }
  } catch (error) {
    res.status(400).json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác" });
  }
}


module.exports = { postCreateTaiKhoan, getAllTaiKhoan, loginTaiKhoan, loginAdmin };
