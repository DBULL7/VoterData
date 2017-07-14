const express = require('express')
const r = express.Router()
const vc = require('./controllers/voterController')
const dc = require('./controllers/districtController')
const helper = require('./controllers/controllerHelpers')
const a = require('./controllers/authenticateController')


r.get('/district', dc.getAllDistricts) // works
r.get('/district/:num/:gender/', dc.getGender) // works need to make it able to get all voters using a range
r.get('/district/:num/voters/', dc.getDistrictVoters) //works
r.patch('/district/:id', helper.checkAuth, dc.updateDistrict) // works
r.post('/district', helper.checkAuth, dc.newDistrict) // works but needs improvements
r.get('/district/:num/party/party?:party', dc.getDistrictByParty) //works
r.delete('/district/:id', helper.checkAuth, dc.deleteDistrict) //works but verify again
r.get('/district/:num', helper.checkreq, dc.getDistrict) //works


r.get('/voters', vc.getVoters)
r.get('/voters/:voter', vc.getVoter)
r.post('/voters', helper.checkAuth, vc.newVoter)
r.patch('/voters/:id')
r.delete('/voters/:id', helper.checkAuth, vc.deleteVoter)

r.post('/authenticate', a.getAuthentication)

module.exports = r;
