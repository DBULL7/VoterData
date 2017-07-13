let express = require('express')
let app = express()
let bodyParser = require('body-parser')
const router = require('./router')
let port = (process.env.PORT || 3000)

app.use(bodyParser.json())


app.use('/api/v1', router)

app.listen(port, () => {
  process.stdout.write('\033c')
  console.log()
  console.log(`Listening at port ${port}`);
})





// Backup code in case I want to generate more voter records


// db.collection('voters').drop()
// for (let i = 53000; i < 56000; i++) {
//   db.collection('voters').save({voter: test.arr[i]})
// }
//   test.arr.map((voter, index) => {
//     console.log(index);
//     db.collection('voters').save({voter: voter})
//   })
