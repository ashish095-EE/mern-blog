import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB Connected");
}).catch((err) =>{
    console.error(err);
    
});



const app = express();
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message ||"Intenal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
});


app.listen(3000, () => {
    console.log("server running on port 3000");
});


