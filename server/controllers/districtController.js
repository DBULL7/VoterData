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


const getDistrict = (req, res) => {
  let toNum = Number(req.params.num)
  db.collection('districts').find({District: toNum}).toArray((err, results) => {
    if (err) return res.status(404).send({message: 'Nothing found. Maybe enter a district between 1 and 7?'})
    res.status(200).json(results)
  })
}

const getDistrictVoters = () => {
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
  console.log(req.query);
  console.log(req.body);
  res.send(req.body && req.query)
}

module.exports = {
  getDistrict: getDistrict,
  getDistrictByParty: getDistrictByParty
};
