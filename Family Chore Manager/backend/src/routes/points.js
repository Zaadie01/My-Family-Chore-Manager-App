import express from 'express';
import { getUserPoints, getAllUserPoints } from '../data/store.js';
import { calculateAchievements } from '../helpers/achievements.js';

export const pointsRoutes = express.Router();

// Get user points and achievements
pointsRoutes.get('/:userId', (req, res) => {
    try {
        const points = getUserPoints(req.params.userId);
        const achievements = calculateAchievements(points);
        
        res.json({
            userId: req.params.userId,
            points: points,
            achievements: achievements
        });
    } catch (error) {
        console.error('Error getting points:', error);
        res.status(500).json({ error: 'Failed to get points' });
    }
});

// Get leaderboard
pointsRoutes.get('/', (req, res) => {
    try {
        const leaderboard = getAllUserPoints();
        res.json(leaderboard);
    } catch (error) {
        console.error('Error getting leaderboard:', error);
        res.status(500).json({ error: 'Failed to get leaderboard' });
    }
}); 