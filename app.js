import express from 'express'

import protectedRouter from "./app/routes/protected.js"
import router from './app/routes/authRouter.js'
import defaultRouter from './app/routes/routes.js'


const app = express();
app.use(express.json());

app.use(protectedRouter)
app.use(router)
app.use('/api', defaultRouter)


export default app;