import { Router } from "express";
import prisma from "../prisma.js";
import { newProduct } from "../services/productServices.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Permission } from "../../database/authorization.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await prisma.products.findMany();
  res.json(products);
});

router.get(
  "/test",
  authorizePermission(Permission.BROWSE_PRODUCTS),
  async (req, res) => {
    const products = await prisma.products.findMany();
    res.json(products);
  }
);

router.get("/:id", async (req, res) => {
  const product = await prisma.products.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  res.json(product);
});

router.get("/:params", async (req, res) => {
  const product = await prisma.products.findMany({
    where: {
      name: req.params.params,
    },
  });
  res.json(product);
});

router.post(
  "/add",
  authorizePermission(Permission.ADD_PRODUCT),
  async (req, res) => {
    const product = await prisma.products.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
      },
    });
    res.json({
      message: "product added successfully!",
    });
  }
);
export default router;
