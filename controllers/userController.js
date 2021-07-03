import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

/**
 * Register User
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

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

export { register, getUsers };
