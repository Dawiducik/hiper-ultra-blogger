const config = {
  database: {
    type: '',
    host: '',
    username: '',
    password: '',
    dbName: ''
  },
  password: {
    saltRounds: 10
  },
  jwtToken: {
    secretKey: '',
    options: {
      expiresIn: '24h',
      issuer: 'dawiducik'
    },
  }
}

module.exports = config;