import express from "express";
import { getAllApplicatonsFunc } from "../controllers/applicationconroller.js";
import { isAuthorized } from "../auth/isAuthentication.js";

const router = express.Router();

//application routers
//get all applications routs
router.get("/get_applicaton", isAuthorized, getAllApplicatonsFunc);

export default router;
