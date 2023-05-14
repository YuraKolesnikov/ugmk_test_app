import express from 'express'
import cors from 'cors'

import { router } from './api/routers/router'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
)

app.get('/ping', (_, res) => res.send({ message: 'pong' }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

export { app }
