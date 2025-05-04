import { BaseDao } from './BaseDao.js';
import { v4 as uuidv4 } from 'uuid';

export class ChoreDao extends BaseDao {
  constructor() {
    super('chores');
  }

  async create(chore) {
    const id = uuidv4();
    const newChore = {
      id,
      ...chore,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    await this.writeFile(id, newChore);
    return newChore;
  }

  async get(id) {
    return await this.readFile(id);
  }

  async update(id, chore) {
    const existingChore = await this.get(id);
    if (!existingChore) return null;

    const updatedChore = {
      ...existingChore,
      ...chore,
      id,
      updated_at: new Date().toISOString()
    };
    await this.writeFile(id, updatedChore);
    return updatedChore;
  }

  async delete(id) {
    const chore = await this.get(id);
    if (!chore) return false;
    await this.deleteFile(id);
    return true;
  }

  async list() {
    const files = await this.listFiles();
    const chores = await Promise.all(
      files.map(file => this.readFile(file.replace('.json', '')))
    );
    return chores;
  }
} 