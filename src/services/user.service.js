import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const newUser = async (body) => {
  const { name, email, password } = body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    return 'Email already exit';
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let user = User.create({ name, email, password: hashedPassword });
  return user;
};

export const getUser = async () => {
  try {
    const allUsers = await User.find();
    return allUsers;
  } catch (error) {
    throw new Error(error.message);
  }
};
