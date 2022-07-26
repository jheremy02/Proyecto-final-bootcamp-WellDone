
const homeRouter=require("./home.router")
const authRouter=require("./auth.router.js")
const publicationRouter=require("./publication.router")
const userRouter=require("./user.router.js")

function routerIndex(app) {

  app.use("/",homeRouter)
  app.use("/auth",authRouter)
  app.use("/publication",publicationRouter)
  app.use("/user",userRouter)

}

module.exports = routerIndex;
