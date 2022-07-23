const express=require("express")
const router=express.Router()
const Publication=require("../models/Publication.js")

router.get("/:id",(req,res,next)=>{

  const {id}=req.params;
  const publicacion=Publication.findOne({_id:id})
  publicacion.then((data)=>{
    if (data) {
      res.render("publicationDetail",{data})
    } else {
      next()
    }

  })

})



router.get("/create",(req,res)=>{
res.render("createPublication")
})

module.exports=router;
