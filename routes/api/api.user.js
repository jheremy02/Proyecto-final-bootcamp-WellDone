
const express=require("express")
const router=express.Router()
const auth=require("../../middlewares/auth.js")
const upload=require("../../middlewares/upload.js")
const User = require("../../models/User.js")




router.get("/:username",async (req,res)=>{


  const userData=await User.getUser(req.params.username)
  
  res.json(userData)
})

module.exports=router
