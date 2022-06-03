import { Router } from 'express';
import leaderboardHomeController from '../modules/Leaderboard/Home';

const leaderboardRouter = Router();

leaderboardRouter
  .route('/home')
  .get(leaderboardHomeController.handle);

export default leaderboardRouter;
