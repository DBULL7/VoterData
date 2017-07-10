var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


let db;
MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log('Mongo connected');
  db = database
});



const getVoters = (req, res) => {
  db.collection('voters').find().limit(5).toArray((err, results) => {
    if (err) {
      res.status(404).send(404)
    }
    res.status(200).json(results)
  })
}


const getVoter = (req, res) => {
  let voter = req.params.voter.toUpperCase()
  db.collection('voters').find({voter: voter}).toArray((err, results) => {
    if (err) {
      res.status(500).json({message: 'something went wrong.'})
    }

    if (results.length !== 0) {
      res.status(200).json(results)
    } else {
      res.status(404).json({message: 'sorry but we could not find that voter'})
    }
  })
}


module.exports = {
  getVoters: getVoters,
  getVoter: getVoter,
};


//
// db.collection('voters').find({person: 'LEISTER'}, {'person': 1, '_id':0}).toArray(function(err, results) {
//   if (err) throw err
//   console.log(results);
// })
