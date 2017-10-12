const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  let token = req.get('Authorization-Token') || req.query.token;
  console.log('authorization-token', JSON.stringify(req.get('Authorization-Token')));
  if(!token) {
    return res.json({
      success: false,
      message: 'No token provided.',
    });
  } 
  jwt.verify(token, config.jwtToken.secretKey, (err, decoded) => {
    if(err) {
      throw Error();
      return res.send(err);
    } else {
      req.user = decoded.user;
      return next();
    }
    // res.json({
    //   decoded
    // });
  });
}
