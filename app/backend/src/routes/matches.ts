import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import matchCreateController from '../modules/Match/Create';
import matchFindAllController from '../modules/Match/FindAll';
import Schemas from '../schemas/joi';

const matchsRouter = Router();

matchsRouter
  .route('/')
  .get(matchFindAllController.handle)
  .post(
    celebrate({ [Segments.BODY]: Schemas.matchPost }),
    matchCreateController.handle,
  );

export default matchsRouter;
