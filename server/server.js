let express = require('express')
let app = express()
let bodyParser = require('body-parser')
// const fs = require('fs');
// const path = require('path')
// const test = require('./convertOutputToJSON.js')
var MongoClient = require('mongodb').MongoClient;
let port = (process.env.PORT || 3000)
require('dotenv').config()

app.use(bodyParser.json())
let db;
// var uri = `mongodb://${process.env.MONGO_ACCOUNT}:${process.env.MONGO_PASSWORD}${process.env.MONGO_URL}`;
MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('connected');
  db = database
  // db.close()
  // database.collection('voters').find().toArray((err, results) => {
  //   if (err) throw err
  //   console.log(results.length);
  //   database.close()
  // })
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
})


app.get('/:voter', (req, res) => {
  console.log(req.params.voter);
  let voter = req.params.voter.toUpperCase()
  db.collection('voters').find({voter: voter}).toArray((err, results) => {
    if (err) throw err

    if (results.length !== 0) {
      res.status(200).json(results)
    } else {
      res.status(404).json({message: 'sorry but we could not find that voter'})
    }
  })
})

//
// db.collection('voters').find({person: 'LEISTER'}, {'person': 1, '_id':0}).toArray(function(err, results) {
//   if (err) throw err
//   console.log(results);
// })




// Backup code in case I want to generate more voter records


// db.collection('voters').drop()
// for (let i = 53000; i < 56000; i++) {
//   db.collection('voters').save({voter: test.arr[i]})
// }
//   test.arr.map((voter, index) => {
//     console.log(index);
//     db.collection('voters').save({voter: voter})
//   })
