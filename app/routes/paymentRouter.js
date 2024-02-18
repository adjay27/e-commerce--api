import { Permission } from "../../database/authorization.js";
import { authorizePermission } from "../middleware/middleware.js";
import { Router } from "express";
import paymentController from "../controller/payment.js";
import encryption from "../middleware/encryption.js";


const router = Router()

router.use('/pay', encryption, paymentController.pay)


export default router