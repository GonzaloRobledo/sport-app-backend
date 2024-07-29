import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'
import { AuthRoute } from './routes/auth.route'
import cookieParser from 'cookie-parser'
import { connectionMongoDB } from './config/mongodb'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

/**ROUTES**/

app.use('/api', new AuthRoute('/auth').router)

/**======**/

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`)
})

connectionMongoDB()
