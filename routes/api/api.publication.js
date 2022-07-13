const express=require("express")
const router=express.Router()
const auth=require("../../middlewares/auth.js")
const { syncIndexes } = require("../../models/Publication.js")
const Publication=require("../../models/Publication.js")
const upload=require("../../middlewares/upload.js")


//POST : create publication
router.post("/create",auth.authenticateToken, upload.single("image") , async (req,res,next)=>{
  let publicationData={...req.body,userName:req.user.data}
  
  if (req.file) {
    publicationData={...publicationData,image:req.file.path}
  }
  console.log(publicationData.image)
  const newPublication=new Publication(publicationData)
  try {
    const savedPublication=await newPublication.save()
    res.status(200).json(savedPublication)
  } catch (error) {
    res.status(500).json(error)
  }
})

//PUT : update publication

router.put("/:id",async (req,res,next)=>{
  try {
    const publication= await Publication.findById(req.params.id)
      if (publication.userId==req.body.userId) {
          try {
            const updatedPublication=await Publication.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});

            res.status(200).json(updatedPublication)
          } catch (error) {
            res.status(500).json(error)
          }
      } else {
        res.status(401).json("Solo puedes editar tus publicaciones")
      }
  } catch (error) {
    res.status(500).json(error)
  }
})


//DELETE: delete publication

router.delete("/:id",async (req,res,next)=>{
  try {
    const publication= await Publication.findById(req.params.id)
      if (publication.userId==req.body.userId) {
          try {

            await publication.delete()
            res.status(200).json({message:"Publicacion borrada con exito"})
          } catch (error) {
            res.status(500).json(error)
          }
      } else {
        res.status(401).json("Solo puedes borrar tus publicaciones")
      }
  } catch (error) {
    res.status(500).json(error)
  }
})


//GET PUBLICATION

router.get("",(req,res,next)=>{

})

module.exports=router
