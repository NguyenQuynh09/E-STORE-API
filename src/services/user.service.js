const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwt.Provider.js");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("Email này đã đăng kí tài khoản :", email);
    }

    password = await bcrypt.hash(password, 15);

    const user = await User.create({ firstName, lastName, email, password });

    console.log("Tài khoản đã được tạo ", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
 
    if (!user) {
      throw new Error(" Không thể tìm thấy id : ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(" Không thể tìm thấy email : ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserProfileFromToken(token);

    const user = await getUserById(userId);

    if (!user) {
      throw new Error(" Không thể tìm thấy id : ", userId);
    }
    console.log("user ",user)
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUserById,
  findUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
