import express from "express";
import {
  getAllcompanies,
  getcompaniesByID,
  getRegisteredCompany,
  registerCompany,
  updateCompanyInfo,
} from "../Controllers/company.controller.js";
import { isUserAuthenticated } from "../middlewares/user.middlwares.js";
import { isUserRecruiter } from "../middlewares/company.middlewares.js";

const router = express.Router();

// register new company route
router.post("/register", isUserAuthenticated, isUserRecruiter, registerCompany);

// show companies registered by the particular user route
router.get(
  "/mycompanies",
  isUserAuthenticated,
  isUserRecruiter,
  getRegisteredCompany
);

// show all companies to any user
router.get("/allcompanies", getAllcompanies);

// show companies with id to auhtenticated user
router.get("/:id", isUserAuthenticated, getcompaniesByID);

// update company info with id
router.put(
  "/companyInfo/:id",
  isUserAuthenticated,
  isUserRecruiter,
  updateCompanyInfo
);

export default router;
