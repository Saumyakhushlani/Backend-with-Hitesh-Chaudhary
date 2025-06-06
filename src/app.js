import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// Common middlewares 
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))

// import routes
import healthCheckRouter from './routes/healthCheck.routes.js'

// routes
app.use("/api/v1/healthcheck", healthCheckRouter)

export { app }