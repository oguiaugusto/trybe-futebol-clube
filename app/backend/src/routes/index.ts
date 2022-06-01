import { Router } from 'express';
import loginRouter from './login';
import teamsRouter from './teams';
import matchesRouter from './matches';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);

export default router;
