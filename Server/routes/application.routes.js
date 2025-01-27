import express from "express";
import { isUserAuthenticated } from "../middlewares/user.middlwares.js";
import {
  applicationStatus,
  candidateApplyToJob,
  getAllJobsApplied,
  getApplicants,
} from "../Controllers/application.controller.js";
import { isUserRecruiter } from "../middlewares/company.middlewares.js";

const router = express.Router();

// route for appliying to a job with the particular job id
router.get("/apply/:id", isUserAuthenticated, candidateApplyToJob);

// route to get all the jobs applied by the user
router.get("/jobsapplied", isUserAuthenticated, getAllJobsApplied);

// route for fetching the no of user and the users info for a job applicatiion with the jobid
router.get("/applicants/:id", isUserAuthenticated, getApplicants);

// route for updating the job application status
router.post(
  "/status/:id/update",
  isUserAuthenticated,
  isUserRecruiter,
  applicationStatus
);

export default router;
