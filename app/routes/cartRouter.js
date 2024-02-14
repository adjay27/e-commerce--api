import prisma from "../prisma.js";
import { Router } from "express";


const router = Router();

router.get("/", async (req, res) => {
  const cart = await prisma.carts.findMany();
  res.json(cart);
});

router.post('/cart', async (req, res) => {
  const cart = await prisma.carts.create({
    data: {
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    }
  })
  res.json(cart)
})

export default router

