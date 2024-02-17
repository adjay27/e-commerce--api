import { Router } from "express";
import { validateTokenRequest } from "../middleware/validator.js";
import pkg from "jsonwebtoken";
import dotenv from "dotenv";
import authController from "../controller/auth.js";

const router = Router();
dotenv.config();


router.post("/login", validateTokenRequest, authController.login);

export default router;
