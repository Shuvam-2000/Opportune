import JobModel from "../models/job.model.js"; 
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load Environment Variables
dotenv.config();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const jobRecommendationHandler = async (req, res) => {
  try {
    const query = req.body.query.trim().toLowerCase(); 

    // Handle Empty Query (Show Welcome Message When Chatbox Opens in teh Client Side)
    if (!query) {
      return res.status(200).json({
        response:
          "Welcome to Opportune.AI Ask me about job openings based on skills, experience, or location.",
        success: true,
      });
    }

    // If the user says "hi" or similar greetings, respond accordingly
    const greetings = ["hi", "hello", "hey"];
    if (greetings.includes(query)) {
      return res.status(200).json({
        response: "Hi, I can assist you with job recommendations!",
        success: true,
      });
    }

    // Handle Irrelevant Queries
    const jobKeywords = [
      "job",
      "hiring",
      "developer",
      "engineer",
      "designer",
      "software",
      "company",
      "career",
      "vacancy",
      "apply",
    ];
    const isRelevant = jobKeywords.some((keyword) => query.includes(keyword));

    if (!isRelevant) {
      return res.status(400).json({
        message:
          "I can only provide job recommendations. Please ask about jobs!",
        success: false,
      });
    }

    // Fetch Jobs from the Database
    const jobs = await JobModel.find({});

    if (jobs.length === 0) {
      return res.status(400).json({ message: "No jobs found", success: false });
    }

    // Format Job Data for AI Processing
    const jobDataText = jobs
      .map(
        (job) =>
          `Here are the following jobs for you: Job: ${job.jobTitle}, Location: ${job.jobLocation}, Experience: ${job.experience}`
      )
      .join("\n");

    // AI Prompt
    const prompt = `You are an AI job recommendation assistant. Recommend jobs based on the user's query. If no relevant jobs are found, respond professionally without mentioning a database.\n\nAvailable Jobs:\n${jobDataText}\n\nUser Query: ${query}`;
    
    // Use Gemini AI Model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Return Response
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
