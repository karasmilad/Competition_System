import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './config/db.js'
dotenv.config()
const app = express()
// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Test DB Connection
try {
await db.getConnection()
console.log('Database Connected Successfully')
} catch (error) {
console.error('Database Connection Failed', error)
}
/////////////////////
// Routes
/////////////////////
// Health Check Route
app.get('/', (req, res) => {
res.send('Competition API is running 🚀')
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})