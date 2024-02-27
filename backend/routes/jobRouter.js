import express from "express";
import { getAllJobFunc } from "../controllers/jobController.js";

//router object
const router = express.Router();

//routes for job
//get all job router
router.get("/all_jobs", getAllJobFunc);

export default router;
