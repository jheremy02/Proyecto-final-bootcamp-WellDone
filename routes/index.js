
const authRouter=require("./auth.router.js")

function routerIndex(app) {
  app.use("/signUp",authRouter)
}



module.exports = routerIndex;
