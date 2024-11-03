import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.route.js'

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.use('/api/products', productRoutes)

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Server running on ${PORT} port`)
})
