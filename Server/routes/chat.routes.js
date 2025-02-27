import express from 'express';
import { jobRecommendationHandler } from '../Controllers/chat.controller.js';

const router = express.Router();

// chatbot route
router.post('/job-recommend', jobRecommendationHandler);

export default router;