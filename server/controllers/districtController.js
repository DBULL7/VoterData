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
  let distNum = req.params.num
  let checkType = Number(distNum)
  if (isNaN(checkType)) return res.status(400).json({message: 'pick a number from 1 to 7'})
  if (distNum.length > 1) return res.status(400).json({message: 'There are only six districts'})
  db.collection('voters').find({District: checkType}).limit(100).toArray((err, results) => {
    if (err) return res.status(404).send({message: 'Nothing found. Maybe enter a district between 1 and 7?'})
    res.status(200).json(results)
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
