import { Permission } from "../../database/authorization.js";
import { authorizePermission } from "../middleware/middleware.js";
import prisma from "../prisma.js";
import { Router } from "express";
import cartController from "../controller/cart.js";

const router = Router();

router.get(
  "/",
  authorizePermission(Permission.READ_CART),
  cartController.showCart
);

router.post(
  "/add",
  authorizePermission(Permission.ADD_CART),
  cartController.addToCart
);

router.delete('/', authorizePermission(Permission.DELETE_CART), cartController.deleteCart);

export default router;
