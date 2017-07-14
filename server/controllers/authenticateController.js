require('dotenv').config()
let jwt = require('jsonwebtoken');


const getAuthentication = (req, res) => {
  const user = req.body;
  if (user.username !== process.env.USERNAME || user.password !== process.env.PASSWORD) {
    res.status(403).send({
      success: false,
      message: 'Invalid Credentials'
    });
  } else {
    let token = jwt.sign(user, req.app.get('secretKey'), {
      expiresIn: 172800 // expires in 48 hours
    });

    res.json({
      success: true,
      username: user.username,
      token: token
    });
  }
};

module.exports = {
  getAuthentication: getAuthentication
};
