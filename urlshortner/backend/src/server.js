const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router')
const dotenv = require('dotenv')
dotenv.config()


const app = express()


app.use(routes)

const mongourl = 'mongodb+srv://shu810:shu810@cluster0.uub44.mongodb.net/urlshortner?retryWrites=true&w=majority&appName=Cluster0'
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT


mongoose.connect(MONGO_URL||mongourl).then(()=> console.log("connection to db successful")).catch((err)=> console.log(err,'connection failed'))


app.listen(PORT,()=>{
    console.log("Listening at port 3000")
})

