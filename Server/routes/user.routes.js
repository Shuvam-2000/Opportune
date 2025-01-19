import express from "express";
import {
  newUserRegistration,
  useProfileDelete,
  userLogin,
  userLogout,
  userProfileUpdate,
} from "../Controllers/user.controller.js";
import { isUserAuthenticated } from "../middlewares/user.middlwares.js";

const router = express.Router();

// user signup route
router.post("/signup", newUserRegistration);

// user login route
router.post("/login", userLogin);

// user logout route
router.get("/logout", userLogout);

// user profie update route
router.put("/profileupdate/:userid", isUserAuthenticated, userProfileUpdate);

// usrer profile delete route
router.delete('/profiledelete/:userid', isUserAuthenticated, useProfileDelete);

export default router;
