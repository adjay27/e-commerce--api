import { Permission } from "../../database/authorization.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Router } from "express";
import Order from '../services/orderServices.js';


const router = Router()

router.use('/pay', async(req,res) => {

    const payment = await Order.pay(req.body.order_id, req.body)
    res.json({
        message: "Payment Successful", payment
    })
})


export default router