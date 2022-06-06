import { Router } from 'express';
import leaderboardController from '../modules/Leaderboard/Index';
import leaderboardAwayController from '../modules/Leaderboard/Away';
import leaderboardHomeController from '../modules/Leaderboard/Home';

const leaderboardRouter = Router();

leaderboardRouter
  .route('/')
  .get(leaderboardController.handle);

leaderboardRouter
  .route('/home')
  .get(leaderboardHomeController.handle);

leaderboardRouter
  .route('/away')
  .get(leaderboardAwayController.handle);

export default leaderboardRouter;
