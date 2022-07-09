const express=require("express")
const router=express.Router()

router.get("/",(req,res)=>{
 res.render("publicationDetail")
})

router.get("/create",(req,res)=>{
res.render("createPublication")
})
module.exports=router;
