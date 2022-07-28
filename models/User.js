const mongoose = require('mongoose');
const bcrypt=require("bcrypt")
const path = require('path');
const { nextTick } = require('process');

const saltRounds=10;

const userSchema= mongoose.Schema({
  name:String,
  lastName:String,
  email:{type:String,required:true , unique:true},
  userName:{type:String,required:true , unique:true},
  password:{type:String,required:true},
  biography:String,
  imageProfile:String,
} , {
  collection:"users" //aqui va el nombre de la collecion
})



userSchema.pre('save',function (next){
  if (this.isNew || this.isModified("password")) {

    const document=this

    bcrypt.hash(document.password, saltRounds,(err,hashedPassword)=>{
        if (err) {
          next(err)
        } else {
          document.password=hashedPassword;
          next()
        }
    })
  } else {
    next()
  }

})

userSchema.statics.getUser= async (userName)=>{
  const userData= await User.findOne({userName})

  delete userData._id;
  delete userData._v;
  delete userData.password;

  return userData
}

userSchema.methods.isCorrectPassword=function (password,callback) {
  bcrypt.compare(password,this.password,(err , same) => {
    if (err) {
      callback(err)
    } else {
      callback(err,same)
    }
  })
}

userSchema.set("toJSON",{
  transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject._v;
    delete returnedObject.password;
  }
})

//creo el modelo con el esquema previamente definido

const User= mongoose.model("User",userSchema)

//exporto el modelo
module.exports=User
