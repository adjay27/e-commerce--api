import { Permission } from "../../database/authorization.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Router } from "express";
import Order from "../services/orderServices.js";
import paymentController from "../controller/payment.js";


const router = Router()

router.use('/pay', paymentController.pay)


export default router