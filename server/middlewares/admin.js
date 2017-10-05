const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  let token = req.get('Authorization-Token') || req.param.token;
  if(!token) {
    throw Error();
  } 
  jwt.verify(token, config.jwtToken.secretKey, (err, decoded) => {
    if(err) throw Error();
    else next();
    // res.json({
    //   decoded
    // });
  });
}
