import express from "express";
import {
  createJobFunc,
  deleteJobFunc,
  getAllJobFunc,
  getMyJobsFunc,
  singleJonInformation,
  updateJobFunc,
} from "../controllers/jobController.js";
import { isAuthorized } from "../auth/isAuthentication.js";

//router object
const router = express.Router();

//routes for job
//get all job router
router.get("/all_jobs", getAllJobFunc);
//single job detaile
router.get("/single_job_information", isAuthorized, singleJonInformation);
//job create route - use middleware isAuthorize
router.post("/job_create", isAuthorized, createJobFunc);
//get my jobs
router.get("/my_jobs", isAuthorized, getMyJobsFunc);
// job updates
router.put("/update_job/:id", isAuthorized, updateJobFunc);
//job delete
router.delete("/delete_job/:id", isAuthorized, deleteJobFunc);
export default router;
