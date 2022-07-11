const mongoose = require('mongoose');


const publicationSchema= mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  category:{type:String,required:true},
  image:{type:String,required:true}
},{collection:"publications"})

