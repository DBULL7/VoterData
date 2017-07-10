const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/voters', controller.getVoters)
router.get('/:voter', controller.getVoter)


module.exports = router;
