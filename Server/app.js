import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import './utils/connection.js'
import { configDotenv } from 'dotenv';
import userRoute from './routes/user.routes.js'


// intilaize the app
const app = express();

// Load environment variables
configDotenv();

// intialize the PORT
const PORT = process.env.PORT || 4001;

// middlewares
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Enable Cookie Parsing
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Frontend URL
    credentials: true // Allow credentials(cookies)
})); 

// test route
app.get('/', (req,res) => {
    res.send('Hello Server Is Runing');
});

// defining routes for the application
app.use('/user', userRoute);  // user route

// Start the Server
app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));

