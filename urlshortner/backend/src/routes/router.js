const router = require('express').Router()
//get all url links created--------

router.get('/',(req,res)=>{
    res.send("hello")
})

//post or create short url---
router.post('/urls',(req,res)=>{
    const {redirectUrl} = req.body
    
})

//delete a particular url from db-----

module.exports = router