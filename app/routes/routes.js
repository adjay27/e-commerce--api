import { Router } from 'express'
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import cartRouter from './cartRouter.js'
import orderRouter from './orderRouter.js'
import paymentRouter from './paymentRouter.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
router.use('/order', orderRouter)
router.use('/payment', paymentRouter)

export default router