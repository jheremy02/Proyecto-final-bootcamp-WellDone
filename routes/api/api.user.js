
const express=require("express")
const router=express.Router()
const auth=require("../../middlewares/auth.js")
const upload=require("../../middlewares/upload.js")
const User = require("../../models/User.js")



//GET obtner usuario
router.get("/:username",async (req,res)=>{


  const userData=await User.getUser(req.params.username)
  console.log(userData)
  res.json(userData)
})


//UPDATE actualizar informacion de usuario
router.put("/edit/:username", auth.authenticateToken,upload.single("image") ,async (req,res,next)=>{

  let userData={...req.body}

  try {
    const user= await User.findOne({userName:req.body.userName})

      if (user.userName==req.user.data) {

          try {
            delete userData.userName
            let updatedUser
            if (req.file) {

              userData={...userData,image:req.file.path}
              console.log(user.userName)
              console.log(userData)
              updatedUser=await User.findByIdAndUpdate(user._id,{$set:userData},{new:true});

            } else {
              delete userData.image
              updatedUser=await User.findByIdAndUpdate(user._id,{$set:userData},{new:true});
            }


            res.status(200).json(updatedUser)
          } catch (error) {
            res.status(500).json(error)
          }
      } else {
        res.status(401).json("Solo puedes editar si estas logueado")
      }
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports=router
