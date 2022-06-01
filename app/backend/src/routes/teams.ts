import { Router } from 'express';
import teamFindAllController from '../modules/Team/FindAll';

const teamsRouter = Router();

teamsRouter
  .route('/')
  .get(teamFindAllController.handle);

export default teamsRouter;
