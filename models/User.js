const mongoose = require('mongoose');
const path = require('path');


const userSchema=mongoose.Schema({
  name:String,
  lastName:String,
  email:Number,
  image:String,
  userName:String,
  password:String
} , {
  collection:"users" //aqui va el nombre de la collecion
})

//creo el modelo con el esquema previamente definido

const User= mongoose.model("User",userSchema)
