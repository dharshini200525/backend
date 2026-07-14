import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import studentRoutes from './routes/studentRoute.js' // ← இதை Add பண்ணு!

dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB Connected! ✅'))
  .catch((err) => console.log('DB Error:', err))

app.use('/api/students', studentRoutes) // ← இதை Add பண்ணு!

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`)
})