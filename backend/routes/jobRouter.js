import express from "express";
import { createJobFunc, getAllJobFunc } from "../controllers/jobController.js";
import { isAuthorized } from "../auth/isAuthentication.js";

//router object
const router = express.Router();

//routes for job
//get all job router
router.get("/all_jobs", getAllJobFunc);
//job create route - use middleware isAuthorize
router.post("/job_create", isAuthorized, createJobFunc);

export default router;
