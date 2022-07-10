const express=require("express")
const router=express.Router()
const User=require("../../models/User.js")
const { body, validationResult } = require('express-validator');



//Registro de usuario
router.post(
  '/signUp',

  //Validaciones de lo campos

  // username must be an email
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value != req.body.password) {
      throw new Error('Password confirmation does not match password');
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = validationResult(req);//almacena los errores originados en al validaciones
    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() });
    } else {
      const {name,lastName,email,userName,password} = req.body

      const user=new User({name,lastName,email,userName,password})

      user.save(err=>{
        if (err) {
          console.log(err)
          res.status(500).json({errors:"error al registrar usuario"})
        } else {
          res.status(200).json("Usuario registrado correctamente")
        }
      })
    }

  },
);

router.post("/login",

body('password').isLength({ min: 5 }),(req,res)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const {userName,password} = req.body
    console.log(userName)
    User.findOne({userName},(err,user)=>{
      if (err) {
        res.status(500).json({errors:"Error al aunttenicar usuario"})
      } else if (!user){
        res.status(404).json({errors:"usuario no existe"})
      }else {
          user.isCorrectPassword(password,(err,result)=>{
            if (err) {
                res.status(500).json({errors:"error al autenticar"})
            } else if (result){
              res.status(200).json({errors:"usuario autenticado"})
            } else {
              res.status(200).json({errors:"usuario y/o contraseña incorrecta"})
            }
          })
      }

    })
  }
})


module.exports=router
