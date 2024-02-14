import { Router } from 'express'
import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import cartRouter from './cartRouter.js'

const router = Router()

router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)

export default router