const userService = require('../services/user.service');
const jwtProvider = require('../config/jwt.Provider.js');
const bcrypt = require('bcrypt');
const cartService = require('../services/cart.service.js');

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);

    await cartService.createCart(user._id); // Đảm bảo tham số đúng là user._id

    return res.status(200).send({ jwt, message: 'Đăng kí thành công' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = await userService.findUserByEmail(email); // Sử dụng đúng tên hàm findUserByEmail

    if (!user) {
      return res.status(404).send({ message: 'Không tìm thấy người dùng email này:', email });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: 'Mật khẩu không hợp lệ...' });
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: 'Đăng nhập thành công' });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };
