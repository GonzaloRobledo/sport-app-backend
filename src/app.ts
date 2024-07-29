import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'
import { AuthRoute } from './routes/auth.route'
import cookieParser from 'cookie-parser'
import { connectionMongoDB } from './config/mongodb'
import { CourtRoute } from './routes/court.route'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

/**ROUTES**/
const FIX = '/api'
app.use(FIX, new AuthRoute('/auth').router)
app.use(FIX, new CourtRoute('/courts').router)

/**======**/

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`)
})

connectionMongoDB()
