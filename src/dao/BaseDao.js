import fs from 'fs/promises';
import path from 'path';

export class BaseDao {
  constructor(folderName) {
    this.dataFolder = path.join(process.cwd(), 'data', folderName);
  }

  async readFile(fileName) {
    try {
      const filePath = path.join(this.dataFolder, `${fileName}.json`);
      const data = await fs.readFile(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async writeFile(fileName, data) {
    const filePath = path.join(this.dataFolder, `${fileName}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async listFiles() {
    try {
      const files = await fs.readdir(this.dataFolder);
      return files.filter(file => file.endsWith('.json'));
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.mkdir(this.dataFolder, { recursive: true });
        return [];
      }
      throw error;
    }
  }

  async deleteFile(fileName) {
    const filePath = path.join(this.dataFolder, `${fileName}.json`);
    await fs.unlink(filePath);
  }
} 