import express from "express";
import { isAuthorized } from "../auth/isAuthentication.js";
import {
  userRegister,
  userLogin,
  userLogout,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", isAuthorized, userLogout);

export default router;
