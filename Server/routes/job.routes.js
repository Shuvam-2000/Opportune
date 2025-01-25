import express from "express";
import { isUserAuthenticated } from "../middlewares/user.middlwares.js";
import { isUserRecruiter } from "../middlewares/company.middlewares.js";
import {
  createNewJob,
  getAllJobs,
  getJobsById,
} from "../Controllers/job.controller.js";

const router = express.Router();

// create new job route
router.post("/newjobs", isUserAuthenticated, isUserRecruiter, createNewJob);

// get all jobs route
router.get("/alljobs", getAllJobs);

// get jobs with its id route
router.get("/:id", isUserAuthenticated, getJobsById);

export default router;
