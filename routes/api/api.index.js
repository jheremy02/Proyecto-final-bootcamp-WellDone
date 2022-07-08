var express = require('express');

const authApi=require("./api.auth.js")

function routerApi(app) {
  var router = express.Router();
  app.use("/api",router)
  router.use("/auth",authApi)
}


module.exports=routerApi
