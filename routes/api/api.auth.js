const express=require("express")
const router=express.Router()

router.post("/signUp",(req,res)=>{
  res.json({data:"soy el dato"})
})



module.exports=router
