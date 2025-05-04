import { v4 as uuidv4 } from 'uuid';

class UserPointsDao {
  constructor() {
    this.userPoints = new Map();
  }

  async addPoints(userId, points) {
    const currentPoints = this.userPoints.get(userId) || 0;
    const newPoints = currentPoints + points;
    this.userPoints.set(userId, newPoints);
    return {
      userId,
      points: newPoints
    };
  }

  async getPoints(userId) {
    return {
      userId,
      points: this.userPoints.get(userId) || 0
    };
  }

  async getLeaderboard() {
    return Array.from(this.userPoints.entries())
      .map(([userId, points]) => ({ userId, points }))
      .sort((a, b) => b.points - a.points);
  }
}

export const userPointsDao = new UserPointsDao(); 