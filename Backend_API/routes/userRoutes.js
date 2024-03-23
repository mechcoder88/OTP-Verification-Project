// Importing 'express' module
import express from "express";

// Creating 'router' Instance (Object)
const router = express.Router();

// Importing 'userController'
import userController from "../controllers/userController.js";

// Public Routes
router.post('/login', userController.userLogin);
router.post('/verify', userController.verifyUser);

export default router;