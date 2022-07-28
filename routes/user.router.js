var express = require('express');
var router = express.Router();
const auth=require("../middlewares/auth.js")
const User=require("../models/User.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile/:username' ,async (req,res,next)=>{
  const userName=req.params.username
  const userData= await User.getUser(userName)
  res.render("userProfile",{userData})

})

router.get('/profile/edit/:username' ,async (req,res,next)=> {
 const userName=req.params.username
 const userData= await User.getUser(userName)
  res.render("editProfile", {userData})

})


module.exports = router;
