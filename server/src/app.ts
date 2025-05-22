import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import softwareRoutes from './routes/softwareRoutes';
import requestRoutes from './routes/requestRoutes';
import errorMiddleware from './middlewares/errorMiddleware';
import dotenv from 'dotenv';
dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/software', softwareRoutes);
app.use('/api/requests', requestRoutes);

app.use(errorMiddleware);

export default app;
