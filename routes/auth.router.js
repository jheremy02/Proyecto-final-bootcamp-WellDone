const express=require("express")
const router=express.Router()

router.get("/signup",(req,res)=>{
 res.render("signUp")
})

router.get("/login",(req,res)=>{
  res.render("login")
})

module.exports=router;
