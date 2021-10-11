const express = require('express')
const conf = require('./conf/default')
const path = require('path')
global.app = express()
var bodyParser = require('body-parser')
require(path.join(__dirname, "./conf/response_code.js"))

//import JWT globaly
global.jwt = require('jsonwebtoken');
global.jwt_secret = require('./conf/jwt')
require(path.join(__dirname, "/middleware/auth.js"))



global.app.use(bodyParser.urlencoded({
    extended: true
}));
global.app.use(bodyParser.json());

//middleware


require(path.join(__dirname, "/api/user.js"));
require(path.join(__dirname, "/api/admin.js"));
require(path.join(__dirname, "/mysql"));

const port = conf.port

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})