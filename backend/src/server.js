import express from 'express';
import dotenv from 'dotenv';
import userRoutes from '../src/route/auth.route.js'
import { connectDB } from './config/db.js';


const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8050;

// app.use(cors());
app.use(express.json());
app.use('/user', userRoutes)

app.get('/', (req, res)=>{
    return res.send('Hello World');
})

app.listen(PORT, ()=>{
console.log(`Server has started on PORT ${PORT}`)
})