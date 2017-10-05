const Sequelize = require('sequelize');
const config = require('../config/index').database;
let database = {};
const sequelize = new Sequelize(config.dbName, config.username, config.password, {
  host: config.host,
  dialect: config.type,
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

database.sequelize.sync({force: true}).then(() => {
  return User.create({
    username: 'Dawiducikerson'
  })
  .then(() => {
    return User.create({
      username: 'Pawelek1'
    })
  })
  .then(() => {
    return User.create({
      username: 'Ponczek'
    })
  })
  .then(() => {
    let user = User.findOne({
      where: {
        username: 'Pawelek1'
      }
    }).then((user) => {
      return Post.create({
        title: 'Witam na stronie 2',
        body: '<p> witam xDDD</p>',
        friendlyUrl: 'witam-na-stronie-xd',
        UserId: user.id
      });
    });
  })
  .then(() => {
    let user = User.findOne({
      where: {
        username: 'Ponczek'
      }
    }).then((user) => {
      return Post.create({
        title: 'Witam na stronie 3',
        body: '<p> witam xDDD agadg</p>',
        friendlyUrl: 'witam-na-stronie-xd-xdd',
        UserId: user.id
      });
    });
  })
  .then(() => {
    let user = User.findOne({
      where: {
        username: 'Dawiducikerson',
      }
    }).then((user) => {
      return Post.create({
        title: 'Witam na stronie 3',
        body: '<p> witam xDDD agadg</p>',
        friendlyUrl: 'witam-na-stronie-xd-xdd-2',
        UserId: user.id
      });
    });
  });
});
module.exports = database;