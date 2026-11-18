import express from "express"
import dotenv from "dotenv"
import connection from "./config/db.js"
dotenv.config()

const server = express()
import userRoute from "./router/userRouter.js"
const PORT = process.env.PORT
server.use(express.json())
connection()
server.use("/employee",userRoute)

server.listen(PORT,()=>{
    console.log(`starting server: ${PORT}`);
})

