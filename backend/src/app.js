import express from 'express';
import cors from 'cors';
import { choreRoutes } from './routes/chores.js';
import { pointsRoutes } from './routes/points.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chores', choreRoutes);
app.use('/api/points', pointsRoutes);

// Start server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
}); 