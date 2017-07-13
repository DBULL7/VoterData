const express = require('express')
const r = express.Router()
const vc = require('./controllers/voterController')
const dc = require('./controllers/districtController')


r.post('/district/party?:party', dc.getDistrictByParty)
r.get('/district/:num/', dc.getDistrict)

r.get('/voters', vc.getVoters)
r.get('/voters/:voter', vc.getVoter)
r.post('/voter', vc.newVoter)

module.exports = r;
