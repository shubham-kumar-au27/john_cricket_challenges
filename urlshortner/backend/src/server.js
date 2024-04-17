const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router')



const app = express()

app.use(routes)


app.listen(3000,()=>{
    console.log("Listening at port 3000")
})

mongoose.connect("mongodb+srv://shu810:shu810@cluster0.uub44.mongodb.net/urlshortner?retryWrites=true&w=majority&appName=Cluster0").then(()=> console.log("connection to db successful")).catch((err)=> console.log('connection failed'))
