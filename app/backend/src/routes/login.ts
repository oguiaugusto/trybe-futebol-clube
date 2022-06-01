import { Router } from 'express';
import LoginValidations from '../middlewares/LoginValidations';
import loginController from '../modules/Login';

const loginRouter = Router();

loginRouter
  .route('/')
  .post(
    LoginValidations.handle,
    loginController.handle,
  );

export default loginRouter;
