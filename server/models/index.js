const Sequelize = require('sequelize');
const config = require('../config/index');
const bcrypt = require('bcrypt');
let database = {};
const sequelize = new Sequelize(config.database.dbName, config.database.username, config.database.password, {
  host: config.database.host,
  dialect: config.database.type,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  // SQLite only
  storage: 'path/to/database.sqlite'
});
database.sequelize = sequelize;

const User = sequelize.import('./User.js');
database['User'] = User;

const Post = sequelize.import('./Post.js');
database['Post'] = Post;
Post.belongsTo(User);

sequelize
.authenticate()
.then(() => {
  console.log('Connection with db has been established');
})
.catch(err => {
  console.error('Unable to connect to the db: ', err);
});
const hash = bcrypt.hashSync('haslo1', config.password.saltRounds);
database.sequelize
  .sync({ force: true })
  .then(() => {
    User.create({
      username: 'Dawid3k',
      password: hash,
    })
    .catch(err => {
      console.log(err);
    });
  });

module.exports = database;

