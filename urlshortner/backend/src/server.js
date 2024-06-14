import express from "express"
import mongoose from "mongoose";
import Router  from "./routes/router.js";
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'


dotenv.config()


const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(Router)


const mongourl = 'mongodb+srv://shu810:shu810@cluster0.uub44.mongodb.net/urlshortner?retryWrites=true&w=majority&appName=Cluster0'
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT


mongoose.connect(MONGO_URL||mongourl).then(()=> console.log("connection to db successful")).catch((err)=> console.log(err,'connection failed'))


app.listen(PORT||3000,()=>{
    console.log(`Listening at port:${PORT}`)
})

