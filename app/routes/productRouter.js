import { Router } from "express";
import prisma from "../prisma.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Permission } from "../../database/authorization.js";
import productController from "../controller/product.js";

const router = Router();

router.get("/", productController.getAllProduct);

router.get("/:id", productController.getProduct);
router.get("/search", productController.searchProduct);

router.post("/add", authorizePermission(Permission.ADD_PRODUCT), productController.addProduct);

router.put("/edit/:id", authorizePermission(Permission.EDIT_PRODUCT), productController.editProduct);

router.delete("/delete/:id", authorizePermission(Permission.DELETE_PRODUCT), productController.deleteProduct);

export default router;
