import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/note.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notes', noteRoutes);

export default app;
