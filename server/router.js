const express = require('express')
const r = express.Router()
const vc = require('./controllers/voterController')
const dc = require('./controllers/districtController')
const helper = require('./controllers/controllerHelpers')
const a = require('./controllers/authenticateController')


r.get('/district', dc.getAllDistricts)
r.get('/district/:num/:gender/', dc.getGender)
r.get('/district/:num/voters/', dc.getDistrictVoters)
r.patch('/district/:id', helper.checkAuth, dc.updateDistrict)
r.post('/district', helper.checkAuth, dc.newDistrict)
r.get('/district/:num/party/party?:party', dc.getDistrictByParty)
r.delete('/district/:id', helper.checkAuth, dc.deleteDistrict)
r.get('/district/:num', helper.checkreq, dc.getDistrict)


r.get('/voters', vc.getVoters)
r.get('/voters/:voter', vc.getVoter)
r.post('/voters', helper.checkAuth, vc.newVoter)
r.patch('/voters/:id', helper.checkAuth, vc.updateVoter)
r.delete('/voters/:id', helper.checkAuth, vc.deleteVoter)


r.post('/authenticate', a.getAuthentication)

module.exports = r
