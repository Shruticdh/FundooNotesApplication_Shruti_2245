/* eslint-disable prettier/prettier */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let newToken = req.header('Authorization');
    if (!newToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    newToken = newToken.split(' ')[1];

    const user = await jwt.verify(newToken, process.env.JWT_SECRET);
    // console.log('=========>>>>>>>>', user);
    res.user = user;
    req.body.userId = user.userid;
    // res.token = newToken;
    next();
  } catch (error) {
    next(error);
  }
};
