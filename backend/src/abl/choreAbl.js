import { ChoreDao } from '../dao/ChoreDao.js';
import { createChoreSchema, updateChoreSchema } from '../api/validation_schemas/choreSchema.js';
import { userPointsAbl } from './userPointsAbl.js';

class ChoreAbl {
  constructor() {
    this.choreDao = new ChoreDao();
  }

  validateData(data, schema) {
    for (const [key, rules] of Object.entries(schema)) {
      if (rules.required && !data[key]) {
        throw new Error(`${key} is required`);
      }
      if (data[key]) {
        if (rules.type && typeof data[key] !== rules.type) {
          throw new Error(`${key} must be of type ${rules.type}`);
        }
        if (rules.minLength && data[key].length < rules.minLength) {
          throw new Error(`${key} must be at least ${rules.minLength} characters long`);
        }
        if (rules.min !== undefined && data[key] < rules.min) {
          throw new Error(`${key} must be at least ${rules.min}`);
        }
      }
    }
  }

  async createChore(data) {
    this.validateData(data, createChoreSchema);
    return await this.choreDao.create(data);
  }

  async getChore(id) {
    const chore = await this.choreDao.get(id);
    if (!chore) {
      throw new Error('Chore not found');
    }
    return chore;
  }

  async updateChore(id, data) {
    this.validateData(data, updateChoreSchema);
    const chore = await this.choreDao.update(id, data);
    if (!chore) {
      throw new Error('Chore not found');
    }
    return chore;
  }

  async deleteChore(id) {
    const success = await this.choreDao.delete(id);
    if (!success) {
      throw new Error('Chore not found');
    }
    return { message: 'Chore deleted successfully' };
  }

  async listChores() {
    return await this.choreDao.list();
  }

  async completeChore(id) {
    const chore = await this.choreDao.update(id, { completed: true });
    if (!chore) {
      throw new Error('Chore not found');
    }

    // Award points if the chore has an assignee
    if (chore.assignedTo) {
      const points = chore.reward || 10; // Default 10 points if no reward specified
      await userPointsAbl.addPoints(chore.assignedTo, points);
    }

    return chore;
  }
}

export const choreAbl = new ChoreAbl(); 