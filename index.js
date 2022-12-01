import express from 'express'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import history from 'connect-history-api-fallback'

import verifyToken from './src/routes/middleware/validateToken'
import router from './src/routes/helpers/routerInfo'

const app = express()
import('./src/database')

if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const port = process.env.PORT || 3000

app.use(cors())
app.use(history())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './public')))
app.use('/api', verifyToken, router)

app.listen(port, () => console.log(`Running on port: ${port}`))
