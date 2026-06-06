import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'

app.use(cookieParser())

import userRouter from './router/user.router.js'


app.use('/api/v1/user',userRouter)

export{app}