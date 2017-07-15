var MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
let mongodb = require('mongodb')


let db;
let mongoConnection;
if (process.env.NODE_ENV == 'test') {
  mongoConnection = process.env.MONGODB_TEST_URI
} else {
  mongoConnection = process.env.MONGODB_URI
}
MongoClient.connect(mongoConnection, function(err, database) {
  if (err) {
    console.log(err)
  }
  db = database
});



const getVoters = (req, res) => {
  // NOTE: make this so that person can go find voters every 100 voters? using .skip()
  db.collection('voters').find({}).limit(100).toArray((err, results) => {
    if (err) return res.status(404).send(err)
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
  // NOTE: need to verify all this info so null isnt inserted
  let { lastName, firstName, District, Gender, party, status } = req.body
  db.collection('voters').insert(
                                 { voter: [ lastName, firstName ],
                                 District: District,
                                 Gender: Gender,
                                 party: party,
                                 status: status }
                               )
  .then(results => {
    res.status(201).json({message: 'New Voter Added'})
  }).catch(err => {
    res.status(500).json(err)
  })
}

const deleteVoter = (req, res) => {
  let id = req.params.id
  db.collection('voters').deleteOne({_id: new mongodb.ObjectID(id)})
  .then(results => {
    res.status(204).json({message: 'Successfully deleted'})
  }).catch(err => {
    res.status(500).json(err)
  })
}

const updateVoter = (req, res) => {
  let id = req.params.id
  let key = req.body.field
  let value = req.body.fieldValue
  let command = req.body.command
  let jsonCommand = {}
  let json = {}
  json[key] = value
  jsonCommand[command] = json
  db.collection('voters').update({_id: new mongodb.ObjectID(id)}, jsonCommand).then(results => {
    res.status(201).json({message: 'updated successfully'})
  }).catch(err => res.status(500).send(err))
}




module.exports = {
  getVoters: getVoters,
  getVoter: getVoter,
  newVoter: newVoter,
  deleteVoter: deleteVoter,
  updateVoter: updateVoter
};
