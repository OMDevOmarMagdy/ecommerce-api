const { registerUser, loginUser, getUserProfile } = require('../services/authService');
const generateToken = require('../utils/generateToken');
const { registerValidation, loginValidation } = require('../validations/authValidation');

const register = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const { email, password } = req.body;
    const user = await loginUser(email, password);

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user._id);
    res.status(200).json({
      message: "User profile fetched successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
