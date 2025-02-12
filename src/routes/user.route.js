/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { registerValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

// import { userAuth } from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/', registerValidator, userController.registerUser);
router.get('/', userAuth, userController.getAllUsers);
router.post('/login', userController.loginUsers);
router.post('/forget' , userController.forgetPass);

export default router;
