const express = require('express')
const r = express.Router()
const vc = require('./controllers/voterController')
const dc = require('./controllers/districtController')
const helper = require('./controllers/controllerHelpers')

r.get('/district', dc.getAllDistricts) // works
r.get('/district/:num/:gender/', dc.getGender) // works need to make it able to get all voters using a range
r.get('/district/:num/voters/', dc.getDistrictVoters) //works
r.patch('/district/:id', dc.updateDistrict) // works
r.post('/district', dc.newDistrict) // works but needs improvements
r.get('/district/:num/party/party?:party', dc.getDistrictByParty) //works
r.delete('/district/:id', dc.deleteDistrict) //works but verify again
r.get('/district/:num', helper.checkRequest, dc.getDistrict) //works


r.get('/voters/range/:num')
r.get('/voters', vc.getVoters)
r.get('/voters/:voter', vc.getVoter)
r.post('/voter', vc.newVoter)
r.patch('/voter/:id')
r.delete('/voters/:voter', vc.deleteVoter)

module.exports = r;
