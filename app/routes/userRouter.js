import { Router } from "express";
import userController from "../controller/user.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Permission } from "../../database/authorization.js";
const router = Router();


router.get("/info/:id", userController.info)
router.post('/register', userController.register)
router.get('/all', userController.allUsers)

export default router