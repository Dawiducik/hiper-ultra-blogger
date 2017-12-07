const config = {
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    dbName: 'project_blog'
  },
  password: {
    saltRounds: 10
  },
  jwtToken: {
    secretKey: 'kl;jaw;[/vb[]b[p3/b[p5[b/fp[gslhlyeryhr',
    options: {
      expiresIn: '24h',
      issuer: 'dawiducik'
    },
  }
}

module.exports = config;