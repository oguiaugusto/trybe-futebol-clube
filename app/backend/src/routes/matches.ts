import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import matchCreateController from '../modules/Match/Create';
import matchFindAllController from '../modules/Match/FindAll';
import Schemas from '../schemas/joi';
import matchFinishController from '../modules/Match/Finish';

const matchesRouter = Router();

matchesRouter
  .route('/')
  .get(matchFindAllController.handle)
  .post(
    celebrate({ [Segments.BODY]: Schemas.matchPost }),
    matchCreateController.handle,
  );

matchesRouter
  .route('/:id/finish')
  .patch(matchFinishController.handle);

export default matchesRouter;
