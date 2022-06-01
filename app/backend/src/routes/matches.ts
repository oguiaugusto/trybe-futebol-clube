import { Router } from 'express';
import matchFindAllController from '../modules/Match/FindAll';

const matchsRouter = Router();

matchsRouter
  .route('/')
  .get(matchFindAllController.handle);

export default matchsRouter;
