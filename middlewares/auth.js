const jwt=require("jsonwebtoken")

function authenticateToken(req,res,next) {
  const authHeader=req.headers["authorization"];
  const token=authHeader && authHeader.split(' ')[1];

  if (token==null) {
    return res.status(401).json({errors:"unauthorized"})
  }

  jwt.verify(token,"Snippet_SecretKEY",(err,user)=>{
    if (err) return res.status(403).json({errors:"accion denegada"});
    req.user=user
    next()
  })
}

function generateAccessToken(userName) {
    return jwt.sign({data:userName},"Snippet_SecretKEY",{expiresIn:"1h"})
}


module.exports={ authenticateToken,generateAccessToken }
