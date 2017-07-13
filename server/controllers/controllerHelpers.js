const checkRequest = (req, res, next) => {
  let distNum = req.params.num
  let checkType = Number(distNum)
  if (isNaN(checkType)) return res.status(400).json({message: 'pick a number from 1 to 7'})
  if (distNum.length > 1) return res.status(400).json({message: 'There are only six districts'})
  next()
}

module.exports = {
  checkRequest: checkRequest
};
