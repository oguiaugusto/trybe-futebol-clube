import { Router } from 'express';
import LoginValidateController from '../modules/Login/LoginValidateController';
import LoginValidations from '../middlewares/LoginValidations';
import loginController from '../modules/Login';
import auth from '../middlewares/Auth';

const loginRouter = Router();

loginRouter
  .route('/')
  .post(
    LoginValidations.handle,
    loginController.handle,
  );

loginRouter
  .route('/validate')
  .get(auth.handle, LoginValidateController.handle);

export default loginRouter;
