import { userPointsDao } from '../dao/UserPointsDao.js';

class UserPointsAbl {
  constructor() {
    this.userPointsDao = userPointsDao;
  }

  async addPoints(userId, points) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Valid user ID is required');
    }
    if (!points || typeof points !== 'number' || points < 0) {
      throw new Error('Valid points value is required');
    }
    return await this.userPointsDao.addPoints(userId, points);
  }

  async getPoints(userId) {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Valid user ID is required');
    }
    return await this.userPointsDao.getPoints(userId);
  }

  async getLeaderboard() {
    return await this.userPointsDao.getLeaderboard();
  }

  getAchievements(points) {
    const achievements = [];
    if (points >= 1000) {
      achievements.push({ name: 'Master Organizer', description: 'Earned 1000 points' });
    }
    if (points >= 500) {
      achievements.push({ name: 'Super Helper', description: 'Earned 500 points' });
    }
    if (points >= 100) {
      achievements.push({ name: 'Getting Started', description: 'Earned 100 points' });
    }
    return achievements;
  }
}

export const userPointsAbl = new UserPointsAbl(); 