import express from "express";
import {
  deleteJobSeekerApplicationFunc,
  getAllEmployerApplicatonsFunc,
  getAllJobSeekerApplicatonsFunc,
  createApplicationFunc,
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
//get all applications routs
router.delete(
  "/job_seeker/delete_job_application/:id",
  isAuthorized,
  deleteJobSeekerApplicationFunc
);
//create applications routs
router.post(
  "/job_seeker/create_application",
  isAuthorized,
  createApplicationFunc
);

export default router;
