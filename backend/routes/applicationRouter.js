import express from "express";
import {
  getAllEmployerApplicatonsFunc,
  getAllJobSeekerApplicatonsFunc,
} from "../controllers/applicationconroller.js";
import { isAuthorized } from "../auth/isAuthentication.js";

const router = express.Router();

//application routers
//get all applications routs
router.get(
  "/employer/get_applicatons",
  isAuthorized,
  getAllEmployerApplicatonsFunc
);
//get all applications routs
router.get(
  "/job_seeker/get_applicatons",
  isAuthorized,
  getAllJobSeekerApplicatonsFunc
);

export default router;
