
const homeRouter=require("./home.router")
const authRouter=require("./auth.router.js")
const publicationRouter=require("./publication.router")


function routerIndex(app) {
  app.use("/",homeRouter)
  app.use("/auth",authRouter)
  app.use("/publication",publicationRouter)
}



module.exports = routerIndex;
