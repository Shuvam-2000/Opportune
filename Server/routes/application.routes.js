import express from "express";
import { isUserAuthenticated } from "../middlewares/user.middlwares.js";
import {
  candidateApplyToJob,
  getAllJobsApplied,
} from "../Controllers/application.controller.js";

const router = express.Router();

// route for appliying to a job with the particular job id
router.post("/apply/:id", isUserAuthenticated, candidateApplyToJob);

// route to get all the jobs applied by the user
router.get("/jobsapplied", isUserAuthenticated, getAllJobsApplied);

export default router;
