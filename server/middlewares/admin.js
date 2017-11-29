const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  let token = req.get('Authorization-Token') || req.query.token;
  console.log('TOKEN: ' + token);
  if(!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided.',
    });
  } 
  jwt.verify(token, config.jwtToken.secretKey, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        success: false,
        message: 'Bad token.',
      });
    } else {
      req.user = decoded.user;
      return next();
    }
  });
}
