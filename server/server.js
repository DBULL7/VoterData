let express = require('express')
let app = express()
const fs = require('fs');
const path = require('path')
// const test = require('./convertOutputToJSON.js')
var MongoClient = require('mongodb').MongoClient;
let port = (process.env.PORT || 3000)
require('dotenv').config()


var uri = `mongodb://${process.env.MONGO_ACCOUNT}:${process.env.MONGO_PASSWORD}${process.env.MONGO_URL}`;
MongoClient.connect(uri, function(err, db) {
  if (err) throw err

  // db.collection('voters').find().toArray((err, results) => {
  //   if (err) throw err
  //   console.log(results.length);
  //   db.close()
  // })
});

//
// db.collection('voters').find({person: 'LEISTER'}, {'person': 1, '_id':0}).toArray(function(err, results) {
//   if (err) throw err
//   console.log(results);
// })

app.listen(port, () => {
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
