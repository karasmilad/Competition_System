import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './config/db.js'
import judgeRoutes from "./routes/judgeRoutes.js";

dotenv.config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/judges", judgeRoutes)

// Health Check
app.get('/', (req, res) => {
    res.send('Competition API is running')
})
const startServer = async () => {
    try {
        await db.getConnection()
        console.log('Database Connected Successfully')

        const PORT = process.env.PORT || 5000
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })

    } catch (error) {
        console.error('Database Connection Failed', error)
    }
}
startServer()