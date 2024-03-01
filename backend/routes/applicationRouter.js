import express from "express";
import { getAllEmployerApplicatonsFunc } from "../controllers/applicationconroller.js";
import { isAuthorized } from "../auth/isAuthentication.js";

const router = express.Router();

//application routers
//get all applications routs
router.get(
  "/employer/get_applicatons",
  isAuthorized,
  getAllEmployerApplicatonsFunc
);

export default router;
