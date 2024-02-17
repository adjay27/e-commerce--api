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

router.delete(
  "/:id",
  authorizePermission(Permission.DELETE_CART),
  async (req, res) => {
    const deleteCart = await prisma.carts.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.json({
      message: "Delete product from cart successfuly!",
      deleteCart,
    });
  }
);

export default router;
