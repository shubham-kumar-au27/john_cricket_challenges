import jwt from 'jsonwebtoken';

export const isLoggedIn = (req,res,next)=>{
    const token = req.cookies.token

    //Check if token exists and is verified---

    if (token){
        jwt.verify(token,'this is a secret key').then((decodedToken)=>{
            console.log(decodedToken)
            console.log("Token Validation successful")
            res.status(200).json({message:"Token Validation successful",userId:decodedToken})
            // next()

        }).catch(err => res.status(401).json({message:"failed to verify",err}))

    }
    res.json({message:"User Is Not Authenticated"})

}
export const isAuthentiated = (req,res,next)=>{
    const token = req.cookies.token

    //Check if token exists and is verified---

    if (token){
        jwt.verify(token,'this is a secret key').then((decodedToken)=>{
            console.log(decodedToken)
            console.log("Token Validation successful")
            // res.status(200).json({message:"Token Validation successful"})
            next()

        }).catch(err => res.status(401).json({message:"failed to verify",err}))

    }
    res.json({message:"User Is Not Authenticated"})

}
