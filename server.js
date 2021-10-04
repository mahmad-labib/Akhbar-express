const express = require('express')
var router = express.Router();
const path = require('path')
var bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use('/user', router);

require(path.join(__dirname, "/api/user.js"))(app);
require(path.join(__dirname, "/conf/passport.js"))(app);
require(path.join(__dirname, "/mysql"));


const port = 3030

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})