const mongoose = require('mongoose');


const publicationSchema= mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  categories:{type:Array,required:true},
  image:{type:String,required:true},
  userName:{type:String,required:true}
},{collection:"publications" , timestamps:true})

const Publication= mongoose.model("Publication",publicationSchema)


//exporto el modelo
module.exports=Publication
