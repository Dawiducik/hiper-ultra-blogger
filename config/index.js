const config = {
  database: {
    type: 'postgres',
    host: 'ec2-54-75-224-100.eu-west-1.compute.amazonaws.com:5432',
    username: 'abcalcdsmhyblm',
    password: 'ae6413082cf096ad3337459ceda1c5d860da0114843915e644522b98cbfa0b2b',
    dbName: 'dfqtcigikfbesg'
  },
  password: {
    saltRounds: 10
  },
  jwtToken: {
    secretKey: 'J$[+Muvp_M6E%zY*g>XGFqg%,Fr2:!gZd}!enKJ',
    options: {
      expiresIn: '24h',
      issuer: 'dawiducik'
    },
  }
}

module.exports = config;