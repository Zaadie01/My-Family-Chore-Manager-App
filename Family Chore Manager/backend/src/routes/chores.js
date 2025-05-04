import express from 'express';
import { getChores, addChore, findChoreById, deleteChore } from '../data/store.js';
import { addUserPoints } from '../data/store.js';

export const choreRoutes = express.Router();

// Get all chores
choreRoutes.get('/', (req, res) => {
    try {
        res.json(getChores());
    } catch (error) {
        console.error('Error getting chores:', error);
        res.status(500).json({ error: 'Failed to get chores' });
    }
});

// Add a new chore
choreRoutes.post('/', (req, res) => {
    try {
        // Validate required fields
        if (!req.body.name || !req.body.assignedTo || !req.body.dueDate) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const chore = {
            id: Date.now().toString(),
            name: req.body.name,
            assignedTo: req.body.assignedTo,
            dueDate: req.body.dueDate,
            reward: Number(req.body.reward) || 10,
            completed: false
        };
        
        const newChore = addChore(chore);
        res.status(201).json(newChore);
    } catch (error) {
        console.error('Error creating chore:', error);
        res.status(500).json({ error: 'Failed to create chore' });
    }
});

// Complete a chore
choreRoutes.put('/:id/complete', (req, res) => {
    try {
        const chore = findChoreById(req.params.id);
        
        if (!chore) {
            res.status(404).json({ error: 'Chore not found' });
            return;
        }

        // Mark chore as complete
        chore.completed = true;

        // Add points to user
        if (chore.assignedTo) {
            addUserPoints(chore.assignedTo, chore.reward);
        }

        res.json(chore);
    } catch (error) {
        console.error('Error completing chore:', error);
        res.status(500).json({ error: 'Failed to complete chore' });
    }
});

// Delete a chore
choreRoutes.delete('/:id', (req, res) => {
    try {
        const deleted = deleteChore(req.params.id);
        
        if (!deleted) {
            res.status(404).json({ error: 'Chore not found' });
            return;
        }

        res.json({ message: 'Chore deleted' });
    } catch (error) {
        console.error('Error deleting chore:', error);
        res.status(500).json({ error: 'Failed to delete chore' });
    }
}); 