const express = require('express')
const r = express.Router()
const vc = require('./controllers/voterController')
const dc = require('./controllers/districtController')
const helper = require('./controllers/controllerHelpers')



// patch a district
// find gender in district
// 
r.post('/district/party?:party', dc.getDistrictByParty) //need to change this from post
r.get('/district/:num/', helper.checkRequest, dc.getDistrict)

r.get('/voters', vc.getVoters)
r.get('/voters/:voter', vc.getVoter)
r.post('/voter', vc.newVoter)
r.delete('/voters/:voter', vc.deleteVoter)

module.exports = r;
