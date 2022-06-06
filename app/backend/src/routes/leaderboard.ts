import { Router } from 'express';
import leaderboardAwayController from '../modules/Leaderboard/Away';
import leaderboardHomeController from '../modules/Leaderboard/Home';

const leaderboardRouter = Router();

leaderboardRouter
  .route('/home')
  .get(leaderboardHomeController.handle);

leaderboardRouter
  .route('/away')
  .get(leaderboardAwayController.handle);

export default leaderboardRouter;
