import express from 'express'
import {nanoid} from 'nanoid'
import Url from '../model/url.js'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { isAuthentiated } from '../middlewares/authmiddleware.js'
//get all url links created--------
const Router = express.Router()

const createToken = (id)=>{
    return jwt.sign({id,secret:"LETS HAVE SOME FUN"},'this is a secret key',{
        expiresIn:3*24*60*60
    })
}

Router.get('/', async(req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(401).json({ message: "Please Enter Your email and Password!" })
        }
        const user = await User.findOne({ username})

        if (!user) {
            return res.status(404).json({ message: "User Not Found !" })
        }

        bcrypt.compare(password, user?.password).then(async function(result) {
            // result == true
            if (result){
            console.log(result)
            const token = createToken(user?._id)
            console.log(token) 
            res.cookie('jwt',token,{httpOnly:true,maxAge:3*24*60*60})
            
            return res.status(200).json({ user:user._id })
               
            }
            return res.status(401).json({message:"Password does not match !"})
          
        }).catch(err => res.status(500).json({message:err}));
        


        

    } catch (err) {
        console.error("Error occurred:", err)
        return res.status(500).json({ message: "Internal Server Error" })
    }
})
Router.post('/register',async (req,res)=>{
    try{
        const {username,password} = await req.body

        if (!username || !password) return res.status(401).json({message:"Please Enter Your User and Password"})

        const ifUser = await User.find({username})

        if (ifUser) return res.status(509).json({message:"User already Exists"})

        const saltRounds = 10
        bcrypt.hash(password, saltRounds).then(async (hash)=>{
            console.log(hash)
            
        const data = await User.create({username,password:hash})

        return res.status(200).json({message:`${data} created successfully`})

        }).catch((err) => res.status(500).json({message:err}))




    }catch(err){
        res.status(200).json({message:err})
    }
})


//post or create short url---
Router.post('/urls',isAuthentiated,async (req,res)=>{
    const {redirectUrl,userId} = req.body


    const uniqueId = nanoid(8)

    if (!redirectUrl){
        res.status(404).json("Please Enter url")
    }
    try{
        const data = await Url.create({
            urlId:uniqueId,
            redirectUrl:redirectUrl,
            clicks:[]
        })
        
        res.status(200).json({data:data,unique:uniqueId,redirect:redirectUrl})

    }catch(err){
        res.send(err)

    }
})
//get URL by id-----
Router.get('/:id',async (req,res)=>{
    const id = req.params.id
    const urlId = id
    console.log(urlId)
    try{
        const data = await Url.findOne({urlId:urlId})
        if (!data){
            return res.status(404).json("URL Not found")
        }

        const update = await Url.findOneAndUpdate({urlId:urlId},{
            $push:{clicks:{timeStamp:Date.now()}
           }
        },
           { new: true }
        )
        if (!update){
            return res.status(404).json("Failed to Update! Url not found")
        }
        const redirecturl = data?.redirectUrl
        
        
        // res.send(redirecturl)
        return res.redirect(redirecturl)

    }catch(err){
        console.log(err)
        return res.send(err)
    }

})


//delete a particular url from db-----

export default Router