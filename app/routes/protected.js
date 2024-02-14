import { Router } from "express";
import prisma from "../prisma.js";
import  Jwt  from "jsonwebtoken";


const router = Router();


// need authorization middleware
router.get("/protected", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.users.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      is_blocked: true,
      role_id: true,
    },
  });
  req.user = user;
  res.json({
    message: "You are in the protected route",
    curretUser: req.user,
  });
});



router.post('/cart', async (req,res) => {
  const insertToCart = await prisma.carts.create({

    data: {
      user_id: req.body,
      product_id: req.body,
      quantity: req.body
    }
  })
  res.status(200).json({
    message: 'Add product to cart successfuly!',
    insertToCart
  })
})

export default router;
