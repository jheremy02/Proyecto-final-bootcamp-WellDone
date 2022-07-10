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
  password:{type:String,required:true}
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

userSchema.methods.isCorrectPassword=function (password,callback) {
  bcrypt.compare(password,this.password,(err , same) => {
    if (err) {
      callback(err)
    } else {
      callback(err,same)
    }
  })
}



//creo el modelo con el esquema previamente definido

const User= mongoose.model("User",userSchema)

//exporto el modelo
module.exports=User
