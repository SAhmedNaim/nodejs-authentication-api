import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * @desc Login User
 * @route POST /api/users/login
 * @access Public
 */
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

/**
 * @desc Register User
 * @route POST /api/users/register
 * @access Public
 */
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
  
    if (userExist) {
        res.status(400);
        throw new Error('User already Exist');
    }
  
    const user = await User.create({ name, email, password });
  
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
});

/**
 * @desc Fetch User
 * @route GET /api/users
 * @access Public
 */
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

export { login, register, getUsers };
