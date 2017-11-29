const Sequelize = require('sequelize');
const config = require('../config/index');
const bcrypt = require('bcrypt');
let database = {};
// const sequelize = new Sequelize(config.database.dbName, config.database.username, config.database.password, {
//   host: config.database.host,
//   dialect: config.database.type,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },
//   // SQLite only
//   storage: 'path/to/database.sqlite'
// });
const sequelize = new Sequelize('postgres://abcalcdsmhyblm:ae6413082cf096ad3337459ceda1c5d860da0114843915e644522b98cbfa0b2b@ec2-54-75-224-100.eu-west-1.compute.amazonaws.com:5432/dfqtcigikfbesg');
database.sequelize = sequelize;

const User = sequelize.import('./User.js');
const Post = sequelize.import('./Post.js');
const Tag = sequelize.import('./Tag.js');
// const Tag = sequelize.define('tag', {
//   name: Sequelize.STRING
// }, {
//   timestamps: false,
// });
// const PostTags = sequelize.import('./PostTag.js');

database['User'] = User;
database['Post'] = Post;
database['Tag'] = Tag;

Post.belongsTo(User);

// Post.belongsToMany(Tag, { through: 'postTags' });
// Tag.belongsToMany(Post, { through: 'postTags' });
// Tag.removeAttribute('id');
Post.hasMany(Tag, { foreignKey: 'PostId' });
Tag.belongsTo(Post, { foreignKey: 'PostId', as: 'Post' });
// Tag.belongsTo(Post, { as: 'post', foreignKey: 'PostId' });

sequelize
.authenticate()
.then(() => {
  console.log('Connection with db has been established'); 
})
.catch(err => {
  console.error('Unable to connect to the db: ', err);
});



// const Product = sequelize.define('product', {
//   title: Sequelize.STRING
// });
// const Tag2 = sequelize.define('tag', {
//   name: Sequelize.STRING
// }, {
//   timestamps: false,
// });

// Product.belongsToMany(Tag2, { through: 'productsTags' });
// Tag2.belongsToMany(Product, { through: 'productsTags' });
// sequelize.sync({ force: true })
// .then(() => {
//   Product.create({
//     id: 1,
//     title: 'Chair',
//     tags: [
//       { name: 'Alpha' },
//       { name: 'Beta' }
//     ]
//   }, {
//     include: [ Tag2 ]
//   })
//   .then(product => console.log(product.tags))
//   .then(() => {
//     Product.create({
//       id: 2,
//       title: 'Makrela',
//       tags: [
//         { name: 'Alpha' },
//         { name: 'Gamma' }
//       ]
//     }, {
//       include: [ Tag2 ]
//     });
//   })
// });



const hash = bcrypt.hashSync('haslo1', config.password.saltRounds);
database.sequelize
  .sync({ force: true })
  .then(() => {
    User.create({
      username: 'Dawid3k',
      password: hash,
    })
    // .then(user => {
    //   console.log(user.id); 
    //   Post.create({
    //     title: 'Muj pierwsszy post',
    //     body: '<p> sdf </p>',
    //     friendlyUrl: 'fsdfsdf-fsdfsd-fsdfsd',
    //     UserId: user.id,
    //     tags: [
    //       {
    //         name: 'lubie',
    //       },
    //       {
    //         name: 'placki',
    //       }
    //     ],
    //   }, {
    //     include: [ Tag ],
    //   })
    //   .then(post => console.log(post));
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  });

module.exports = database;

