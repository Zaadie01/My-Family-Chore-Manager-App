import express from 'express';
import { choreAbl } from '../../abl/choreAbl.js';

const router = express.Router();

// List all chores
router.get('/', async (req, res) => {
  try {
    const chores = await choreAbl.listChores();
    res.json(chores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific chore
router.get('/:id', async (req, res) => {
  try {
    const chore = await choreAbl.getChore(req.params.id);
    res.json(chore);
  } catch (error) {
    if (error.message === 'Chore not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Create a new chore
router.post('/', async (req, res) => {
  try {
    const chore = await choreAbl.createChore(req.body);
    res.status(201).json(chore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a chore
router.put('/:id', async (req, res) => {
  try {
    const chore = await choreAbl.updateChore(req.params.id, req.body);
    res.json(chore);
  } catch (error) {
    if (error.message === 'Chore not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Delete a chore
router.delete('/:id', async (req, res) => {
  try {
    const result = await choreAbl.deleteChore(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Chore not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Complete a chore
router.put('/:id/complete', async (req, res) => {
  try {
    const chore = await choreAbl.completeChore(req.params.id);
    res.json(chore);
  } catch (error) {
    if (error.message === 'Chore not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

export default router; 