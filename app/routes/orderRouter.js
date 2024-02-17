import { Permission } from "../../database/authorization.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Router } from "express";
import Order from "../services/orderServices.js";
import orderController from "../controller/order.js";

const router = Router();

router.post(
  "/",
  authorizePermission(Permission.ADD_ORDER),
  async (req, res) => {
    const user = req.user;
    console.log(user);
    const product_id = req.body.product_id;
    const checkout = await Order.checkout(product_id, user.id);
    res.json(checkout);
  }
);

router.get(
  "/",
  authorizePermission(Permission.READ_ORDER),
  orderController.orderByUser
);


export default router;
