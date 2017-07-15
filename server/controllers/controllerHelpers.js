let jwt = require('jsonwebtoken')

const checkreq = (req, res, next) => {
  let distNum = req.params.num
  let checkType = Number(distNum)
  if (isNaN(checkType)) return res.status(400).json({message: 'pick a number from 1 to 7'})
  if (distNum.length > 1) return res.status(400).json({message: 'There are only six districts'})
  next()
}

const checkAuth = (req, res, next) => {
  const token = req.body.token ||
                req.params.token ||
                req.headers['authorization']

  if (token) {
    jwt.verify(token, req.app.get('secretKey'), (error, decoded) => {
      if (error) {
        return res.status(403).send({
          success: false,
          message: 'Invalid authorization token.'
        })
      }
      else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'You must be authorized to hit this endpoint'
    })
  }
}

module.exports = {
  checkreq: checkreq,
  checkAuth: checkAuth
}
