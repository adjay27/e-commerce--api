import pkg from "jsonwebtoken";
import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
const { TokenExpiredError } = pkg;

const authController = {
  login: async (req, res) => {
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

      const token = generateToken({ id: user.id });

      res.json({
        message: "Successfully logged in!",
        currentUser: user.name,
        token,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({
          message: "Token expired",
        });
      }
      if (error instanceof pkg.JsonWebTokenError) {
        res.status(401).json({
          message: "Invalid token",
        });
      }
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default authController;
