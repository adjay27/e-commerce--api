import { Router } from "express";
import { validateTokenRequest } from "../middleware/validator.js";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import dotenv from "dotenv";

const router = Router();
dotenv.config();
const { TokenExpiredError } = pkg;

router.post("/login", validateTokenRequest, async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { email: req.body.email },
    });
  
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  
    if (user.is_blocked) {
      return res.status(401).json({
        message: "Cannot access, this account has been blocked by an admin.",
      });
    }
  
    const validPass = bcrypt.compareSync(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  
    const token = pkg.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
  
    res.json({
      message: "Successfully logged in!",
      currentUser: user.name,
      token,
    });
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        message: "Token expired",
      })
    }
    if (error instanceof pkg.JsonWebTokenError ) {
      res.status(401).json({
        message: "Invalid token",
      })
    }
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
