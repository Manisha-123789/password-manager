import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '../src/route/auth.route.js'
import { connectDB } from './config/db.js';
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import cors from 'cors'
import { errorHandler } from './middleware/auth.middleware.js';

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8000;

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(errorHandler);
app.use(cors({
  origin : "https://password-manager-7ack1hnt3-manishas-projects-debafcfa.vercel.app/",
    credentials: true

}));
app.use(express.json());
app.use('/user', userRoutes)

app.get('/', (req, res)=>{
    return res.send('Hello World');
})

app.listen(PORT, ()=>{
console.log(`Server has started on PORT ${PORT}`)
})