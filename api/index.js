import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.routes.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB Connected");
}).catch((err) =>{
    console.error(err);
    
});



const app = express();
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

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


