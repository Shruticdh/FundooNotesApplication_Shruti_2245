/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const newUser = async (body) => {
  try {
    const { name, email, password } = body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return 'Email already exit';
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let user = User.create({ name, email, password: hashedPassword });
    return user;
  } catch (error) {
    return { error: error.message };
  }
};

export const loginUser = async (body) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (!user) {
      return 'email not exist';
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return 'Invalid password';
    }

    const token = jwt.sign(
      { userid: user._id, email: user.email },
      process.env.JWT_SECRET
    );
    return { message: 'login successful', token, user };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUser = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
