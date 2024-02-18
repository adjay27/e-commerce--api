import { Router } from "express";
import userController from "../controller/user.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Permission } from "../../database/authorization.js";
const router = Router();

router.get(
  "/info",
  authorizePermission(Permission.READ_USER),
  userController.info
);
router.post("/register", userController.register);
router.get(
  "/all",
  authorizePermission(Permission.BROWSE_USERS),
  userController.allUsers
);

router.delete(
  "/delete/:id",
  authorizePermission(Permission.DELETE_USER),
  userController.deleteUser
);

router.put(
  "/edit/:id",
  authorizePermission(Permission.EDIT_USER),
  userController.editUser
);

export default router;
