// Importing ".env" module to use".env" file
import dotenv from 'dotenv';
dotenv.config();

// Importing 'express' module
import express from 'express';

// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
// Importing 'cors' module 
import cors from 'cors';

// Importing "userRoutes" Route
import userRoutes from './routes/userRoutes.js'

// Creating an Instance(object) of "express"
const app = express();

// Using CORS Policy to resolve "Frontend Connectivity Error"
app.use(cors());

// Using ".json()" to read JSON
app.use(express.json());

// Creating Routes
app.use("/api/user", userRoutes);

// Specifying port for App Listening
const PORT = process.env.PORT;

// Listening App
app.listen(PORT, ()=>{
    console.log(`Server Listening at "http://localhost:${PORT}"`);
});