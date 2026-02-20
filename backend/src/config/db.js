import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGODB_URI;

export const connectDB  = async()=>{
    try {
       await mongoose.connect(URL);
       console.log('Mongodb has connected')
    } catch (error) {
     console.log(error)
    }
}