const express=require("express")
const router=express.Router()
const auth=require("../../middlewares/auth.js")
const { syncIndexes } = require("../../models/Publication.js")
const Publication=require("../../models/Publication.js")
const upload=require("../../middlewares/upload.js")
const User = require("../../models/User.js")


//GET obtener publicaciones
router.get("/",async (req,res,next)=>{

  const start=parseInt(req.query.start) || 0
  const limit = parseInt(req.query.limit) || 100
  const sort = req.query.sort || 'createdAt'
  const pagination={start,limit,sort}

  const publications= await Publication.list(pagination)



  res.json(publications)
})

//GET obtener publicacion

router.get("/:id",(req,res)=>{
  const {id}=req.params;
  const publication=Publication.findOne({_id:id})

  publication.then((data)=>{
    console.log(data)
    res.json(data)})
})



//POST : create publication
router.post("/create",auth.authenticateToken, upload.single("image") , async (req,res,next)=>{
  req.body.categories=req.body.categories.split(",")
  let publicationData={...req.body,userName:req.user.data}

  if (req.file) {
    publicationData={...publicationData,image:req.file.path}
  }

  const newPublication=new Publication(publicationData)
  try {
    const savedPublication=await newPublication.save()
    res.status(200).json(savedPublication)
  } catch (error) {
    res.status(500).json(error)
  }
})

//TODO : investigar porque las imagenes estan llegando como jpeg


//PUT : update publication

router.put("/update/:id", auth.authenticateToken,upload.single("image") ,async (req,res,next)=>{
  req.body.categories=req.body.categories.split(",")
  let publicationData={...req.body}
  console.log(publicationData)
  try {
    const publication= await Publication.findById(req.params.id)
      if (publication.userName==req.user.data) {
          try {
            let updatedPublication
            if (req.file) {
                publicationData={...publicationData,image:req.file.path}
               updatedPublication=await Publication.findByIdAndUpdate(req.params.id,{$set:publicationData},{new:true});
            } else {
              delete publicationData.image
               updatedPublication=await Publication.findByIdAndUpdate(req.params.id,{$set:publicationData},{new:true});
            }


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

router.delete("/:id", auth.authenticateToken ,async (req,res,next)=>{
  try {
    const publication= await Publication.findById(req.params.id)

      if (publication.userName==req.user.data) {
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
