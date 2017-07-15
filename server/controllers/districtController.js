var MongoClient = require('mongodb').MongoClient
require('dotenv').config()


let db
let mongoConnection
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
})


const getDistrict = (req, res) => {
  let toNum = Number(req.params.num)
  db.collection('districts').find({District: toNum}).toArray((err, results) => {
    if (err) return res.status(404).send({message: 'Nothing found. Maybe enter a district between 1 and 7?'})
    res.status(200).json(results)
  })
}

const getDistrictVoters = (req, res) => {
  let toNum = Number(req.params.num)
  // NOTE: need to add toNum and use the helper method in the router to check if its not a num
  let district = db.collection('districts').findOne({District: toNum})
  Promise.all([district]).then(foundDistrict => {
    let districtID = foundDistrict[0]
    db.collection('voters').find({District: districtID.District}).limit(100).toArray((err, results2) => {
      if (err) throw err
      res.json(results2)
    })
  }).catch(err => {
    res.status(500).json({message: 'something went wrong'})
  })
}


const getDistrictByParty = (req, res) => {
  let toNum = Number(req.params.num)
  let district = db.collection('districts').findOne({District: toNum})
  Promise.all([district]).then(foundDistrict => {
    let districtID = foundDistrict[0]
    db.collection('voters').find({party: req.query.party, status: 'Active'}).limit(100).toArray((err, results2) => {
      if (err) throw err
      res.json(results2)
    })
  }).catch(err => {
    res.status(500).json({message: 'something went wrong'})
  })
}

const newDistrict = (req, res) => {
  // NOTE: this needs to be improved and verified before inserting. Also needs a catch
  const district = req.body
  db.collection('districts').insert({_id: district.id, state: district.state, District: district.district})
  res.status(201).json(district)
  // NOTE: put a catch
}

const updateDistrict = (req, res) => {
  const id = Number(req.params.id)
  if(isNaN(id)) return res.status(400).send('id parameter is not a number')
  let key = req.body.field
  let value = req.body.fieldValue
  let command = req.body.command
  let jsonCommand = {}
  let json = {}
  json[key] = value
  jsonCommand[command] = json
  db.collection('districts').update({_id: id}, jsonCommand).then(results => {
    res.status(201).json({message: 'updated successfully'})
  }).catch(err => res.status(500).send(err))
}


const getGender = (req, res) => {
  let toNum = Number(req.params.num)
  let district = db.collection('districts').findOne({District: toNum})
  Promise.all([district]).then(foundDistrict => {
    let districtID = foundDistrict[0]
    db.collection('voters').find({Gender: req.params.gender, status: 'Active'}).limit(100).toArray((err, results2) => {
      if (err) throw err
      res.json(results2)
    })
  }).catch(err => {
    res.status(500).send(err)
  })
}

const deleteDistrict = (req, res) => {
  const id = Number(req.params.id)
  if (isNaN(id)) return res.status(400).json({message: 'Please include the id of the district to delete'})
  db.collection('districts').deleteOne({_id: id})
  .then(result => {
    res.status(204).json({message: 'Deleted successfully'})
  }).catch(err => {
    res.status(500).send(err)
  })
}

const getAllDistricts = (req, res) => {
  db.collection('districts').find({}).toArray((err, response) => {
    if (err) return res.status(500).json({message: 'Something went wrong'})
    res.status(200).json(response)
  })
}

module.exports = {
  getDistrict: getDistrict,
  getDistrictVoters: getDistrictVoters,
  getDistrictByParty: getDistrictByParty,
  newDistrict: newDistrict,
  updateDistrict: updateDistrict,
  getGender: getGender,
  deleteDistrict: deleteDistrict,
  getAllDistricts: getAllDistricts
}
