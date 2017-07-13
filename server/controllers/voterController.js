var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


let db;
MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  db = database
});



const getVoters = (req, res) => {
  // db.collection('voters').update({"voter.0": '64'},{"$pop": {voter: -1}}, {multi: true})
  // db.collection('voters').update({voter: 'Inactive'}, {$pop: {voter: -1}}, {multi: true})
  // NOTE: make this so that person can go find voters every 100 voters? using .skip()
  db.collection('voters').find({status: 'Active' }).limit(20).toArray((err, results) => {
    if (err) {
      res.status(404).send(404)
    }
    res.status(200).json(results)
  })
}


const getVoter = (req, res) => {
  let voter = req.params.voter
  if (voter.length < 3) return res.status(404).json({message: 'sorry but we could not find that voter'})
  db.collection('voters').find({voter: voter}).limit(10).toArray((err, results) => {
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

const newVoter = (req, res) => {
  let voter = req.body
  if (voter.name) {
    console.log(voter);
    res.status(201).json(voter)
  }
}


module.exports = {
  getVoters: getVoters,
  getVoter: getVoter,
  newVoter: newVoter
};


//
// db.collection('voters').find({person: 'LEISTER'}, {'person': 1, '_id':0}).toArray(function(err, results) {
//   if (err) throw err
//   console.log(results);
// })
