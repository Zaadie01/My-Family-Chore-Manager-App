import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Simple in-memory storage
let chores = [];
let userPoints = {};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Get all chores
app.get('/api/chores', (req, res) => {
  res.json(chores);
});

// Add a new chore
app.post('/api/chores', (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.assignedTo || !req.body.dueDate) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const chore = {
      id: Date.now().toString(), // Simple ID using timestamp
      name: req.body.name,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      reward: Number(req.body.reward) || 10,
      completed: false
    };
    
    chores.push(chore);
    res.status(201).json(chore);
  } catch (error) {
    console.error('Error creating chore:', error);
    res.status(500).json({ error: 'Failed to create chore' });
  }
});

// Complete a chore
app.put('/api/chores/:id/complete', (req, res) => {
  try {
    const chore = chores.find(c => c.id === req.params.id);
    
    if (!chore) {
      res.status(404).json({ error: 'Chore not found' });
      return;
    }

    // Mark chore as complete
    chore.completed = true;

    // Add points to user
    if (chore.assignedTo) {
      if (!userPoints[chore.assignedTo]) {
        userPoints[chore.assignedTo] = 0;
      }
      userPoints[chore.assignedTo] += chore.reward;
    }

    res.json(chore);
  } catch (error) {
    console.error('Error completing chore:', error);
    res.status(500).json({ error: 'Failed to complete chore' });
  }
});

// Delete a chore
app.delete('/api/chores/:id', (req, res) => {
  try {
    const index = chores.findIndex(c => c.id === req.params.id);
    
    if (index === -1) {
      res.status(404).json({ error: 'Chore not found' });
      return;
    }

    chores.splice(index, 1);
    res.json({ message: 'Chore deleted' });
  } catch (error) {
    console.error('Error deleting chore:', error);
    res.status(500).json({ error: 'Failed to delete chore' });
  }
});

// Get user points and achievements
app.get('/api/points/:userId', (req, res) => {
  try {
    const points = userPoints[req.params.userId] || 0;
    
    // Simple achievement system
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
app.get('/api/points', (req, res) => {
  try {
    const leaderboard = Object.entries(userPoints)
      .map(([userId, points]) => ({ userId, points }))
      .sort((a, b) => b.points - a.points);
    
    res.json(leaderboard);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    res.status(500).json({ error: 'Failed to get leaderboard' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 