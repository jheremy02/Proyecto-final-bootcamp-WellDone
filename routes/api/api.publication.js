const express=require("express")
const router=express.Router()
const auth=require("../../middlewares/auth.js")

router.post("/create",auth.authenticateToken,(req,res,next)=>{

  res.json({message:"publicacion creado con exito"})
})


module.exports=router
