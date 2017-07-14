let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const router = require('./router')
let port = (process.env.PORT || 3000)
require('dotenv').config()
app.set('secretKey', process.env.CLIENT_SECRET);
app.use(bodyParser.json())


app.use('/api/v1', router)

app.listen(port, () => {
  process.stdout.write('\033c')
  console.log()
  console.log(`Listening at port ${port}`);
})


module.exports = app;
