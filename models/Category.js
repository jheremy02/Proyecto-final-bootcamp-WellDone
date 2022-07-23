const mongoose = require('mongoose');


const categorySchema= mongoose.Schema({
  name:{type:String,required:true,unique:true},
},{collection:"categories" , timestamps:true})



const Category= mongoose.model("Category",categorySchema)

//exporto el modelo
module.exports=Category
