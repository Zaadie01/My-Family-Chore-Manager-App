import express from 'express';
import { userPointsAbl } from '../../abl/userPointsAbl.js';

const router = express.Router();

// Get user points
router.get('/:userId', async (req, res) => {
  try {
    const userPoints = await userPointsAbl.getPoints(req.params.userId);
    const achievements = userPointsAbl.getAchievements(userPoints.points);
    res.json({ ...userPoints, achievements });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await userPointsAbl.getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 