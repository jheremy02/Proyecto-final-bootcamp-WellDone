const mongoose = require('mongoose');


const publicationSchema= mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  categories:{type:Array,required:true},
  image:{type:String,required:true},
  userName:{type:String,required:true}
},{collection:"publications" , timestamps:true})



publicationSchema.statics.list=function (pagination) {

  const query=Publication.find()
  query.skip(pagination.start)
  query.limit(pagination.limit)
  query.sort(pagination.sort)

  return query.exec().then(data=>{
      return data
  })
}


const Publication= mongoose.model("Publication",publicationSchema)


//exporto el modelo
module.exports=Publication
