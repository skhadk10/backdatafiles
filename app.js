import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()
import bodyParser from 'body-parser'

app.use(cors())

const PORT = 5000

import router from './router.js'
// importing and connectiong MOngoDB
import mongoClient from './config/db.js'
mongoClient()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.use('/api/v1', router)

app.use('/', (req, res) => {
  // thorw new Error("test error")
  res.send('working')
})

app.use((error, req, res, next) => {
  console.log(error)
  res.send(error.message)
})

app.listen(PORT, (error) => {
  error && console.log(error)
  console.log(`server is running at http://localHost:${PORT}`)
})
