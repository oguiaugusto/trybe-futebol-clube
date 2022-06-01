import { Router } from 'express';
import teamFindByIdController from '../modules/Team/FindById';
import teamFindAllController from '../modules/Team/FindAll';

const teamsRouter = Router();

teamsRouter
  .route('/')
  .get(teamFindAllController.handle);

teamsRouter
  .route('/:id')
  .get(teamFindByIdController.handle);

export default teamsRouter;
