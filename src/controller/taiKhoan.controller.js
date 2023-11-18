const TaiKhoan = require("../models/TaiKhoan");
const jwt = require("jsonwebtoken");
const token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const GioHang = require("../models/GioHang");

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
    if (users.tenDangNhap === tenDangNhap && users.matKhau === matKhau) {
      if (users.loaiTaiKhoan === "admin" || users.loaiTaiKhoan === "employee") {
        return res.status(400).send({
          error: "Tài khoản không được cấp quyền",
        });
      }
      if (users.xacThucEmail) {
        const id = users?._id;
        // Đăng ký token để sử dụng api
        const token = jwt.sign(
          { users },
          "secret",
          { expiresIn: "24h" },
          "9359AF90D36CEC62F9522CE3394E8E2E335DF77983E8F9D9AC77C10D09D3074C"
        );
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
      } else {
        return res.status(400).send({
          error: "Tài khoản chưa được xác thực email",
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác" });
  }
};

const postCreateTaiKhoan = async (req, res) => {
  const { tenDangNhap, matKhau, email, loaiTaiKhoan } = req?.body;
  try {
    // Check trùng
    const checkTrungTenDangNhap = await TaiKhoan.findOne({ tenDangNhap });
    const checkTrungEmail = await TaiKhoan.findOne({ email });
    if (checkTrungTenDangNhap?._id) {
      res.status(400).json({
        error: {
          message: "Tên đăng nhập đã tồn tại",
        },
      });
    } else if (checkTrungEmail?._id) {
      res.status(400).json({
        error: {
          message: "Email đã tồn tại",
        },
      });
    } else {
      // const hashPassword = ""

      const gioHang = await GioHang.create({
        danhSach: [],
      });
      const user = await TaiKhoan.create({
        tenDangNhap,
        matKhau,
        email,
        loaiTaiKhoan,
        xacThucEmail: false,
        gioHang: gioHang?._id,
      });
      const tokens = await token.create({
        taiKhoanId: user._id,
        token: jwt.sign({ id: user._id }, "jwtSecretKey", { expiresIn: 300 }),
      });
      const url = `localhost:3000/${user._id}/verify/${tokens.token}`;
      await sendEmail(user.email, "Verify Email", url);
      res
        .status(201)
        .send({ message: "An email sent to your account please verify" });
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
      if (users.loaiTaiKhoan === "admin" || users.loaiTaiKhoan === "employee") {
        const id = users?._id;
        // Đăng ký token
        // const token = jwt.sign({ id }, "jwtSecretKey", { expiresIn: 300 });
        const token = jwt.sign(
          { users },
          "secret",
          { expiresIn: "24h" },
          "9359AF90D36CEC62F9522CE3394E8E2E335DF77983E8F9D9AC77C10D09D3074C"
        );
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
      } else {
        return res.status(400).json({
          error: "Tài khoản không được cấp quyền",
        });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Tên đăng nhập hoặc mật khẩu không chính xác" });
  }
};

module.exports = {
  postCreateTaiKhoan,
  getAllTaiKhoan,
  loginTaiKhoan,
  loginAdmin,
};
