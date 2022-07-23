var express = require('express');

const authApi=require("./api.auth.js")
const publicationApi=require("./api.publication.js")
const userApi=require("./api.user.js")

function routerApi(app) {
  var router = express.Router();
  app.use("/api",router)
  router.use("/auth",authApi)
  router.use("/publication",publicationApi)
  router.use("/user",userApi)
}


module.exports=routerApi
