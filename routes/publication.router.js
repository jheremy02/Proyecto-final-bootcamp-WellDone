const express=require("express")
const router=express.Router()
const Publication=require("../models/Publication.js")

const Category=require("../models/Category.js")


router.get("/create",async (req,res)=>{

  const categoriesdata= await Category.find()
  const categoriesNames=categoriesdata.map(item=>item.name)
  res.render("createPublication",{categories:categoriesNames})
  })


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




router.get("/edit/:id", async (req,res,next)=>{
  const publication=await Publication.findOne({_id:req.params.id})
  const categoriesdata= await Category.find()
  const categoriesNames=categoriesdata.map(item=>item.name)

 console.log(categoriesNames)
 console.log(publication.categories)
  if (publication) {
    res.render("editPublication",{publication,categories:categoriesNames})
  } else {
    next()
  }

})

module.exports=router;
